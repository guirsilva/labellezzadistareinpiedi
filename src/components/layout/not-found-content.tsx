"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { defaultLocale, href, isLocale, type Locale } from "@/i18n/config";

type NotFoundContentProps = {
  texts: Record<Locale, { title: string; backHome: string }>;
};

export function NotFoundContent({ texts }: NotFoundContentProps) {
  const segment = usePathname().split("/").filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const { title, backHome } = texts[locale];

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-8 px-4 py-24 sm:px-6">
      <p aria-hidden="true" className="font-label text-7xl font-bold text-sage">
        404
      </p>
      <h1 className="font-heading text-4xl text-forest sm:text-5xl">{title}</h1>
      <Button asChild variant="forest" size="cta">
        <Link href={href(locale, "home")}>{backHome}</Link>
      </Button>
    </section>
  );
}
