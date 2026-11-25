/*
 * Somente servidor: importa os dois JSONs. Componentes cliente devem receber
 * os textos por props e importar daqui apenas tipos (`import type`).
 */
import { notFound } from "next/navigation";
import it from "../../messages/it.json";
import pt from "../../messages/pt.json";
import { isLocale, type Locale } from "./config";

/** O pt.json (vindo do script) é a referência de estrutura; o it.json precisa ter o mesmo formato. */
export type Dictionary = typeof pt;

const dictionaries = { it, pt } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Lê o parâmetro `[lang]` e garante que é um idioma suportado. */
export async function resolveLocale(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
