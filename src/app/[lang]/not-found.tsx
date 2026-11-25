import { Suspense } from "react";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** A 404 não recebe `params`; o idioma é detectado pela URL no componente cliente. */
export default function NotFound() {
  const texts = Object.fromEntries(
    locales.map((locale) => {
      const { ui } = getDictionary(locale);
      return [locale, { title: ui.notFoundTitle, backHome: ui.backHome }];
    }),
  ) as Record<(typeof locales)[number], { title: string; backHome: string }>;

  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <NotFoundContent texts={texts} />
    </Suspense>
  );
}
