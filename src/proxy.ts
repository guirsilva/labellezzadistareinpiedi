import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  pageKeyFromSegment,
  slugs,
} from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [first, second, ...rest] = pathname.split("/").filter(Boolean);

  // Sem prefixo de idioma → italiano (idioma padrão).
  if (!isLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  if (!second) return NextResponse.next();

  const key = pageKeyFromSegment(second);
  if (!key) return NextResponse.next(); // deixa o app responder (404)

  const tail = rest.length > 0 ? `/${rest.join("/")}` : "";
  const localizedSlug = slugs[first][key];

  // Slug de outro idioma ou chave interna → redireciona para o slug correto.
  if (second !== localizedSlug) {
    const url = request.nextUrl.clone();
    url.pathname = `/${first}/${localizedSlug}${tail}`;
    return NextResponse.redirect(url);
  }

  // Slug traduzido → pasta interna (`app/[lang]/<chave>`).
  const url = request.nextUrl.clone();
  url.pathname = `/${first}/${key}${tail}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ignora internos do Next, API e arquivos estáticos (qualquer caminho com extensão).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
