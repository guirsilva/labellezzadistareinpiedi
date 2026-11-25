import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowWeHelp } from "@/components/home/how-we-help";
import { Impact } from "@/components/home/impact";
import { InstitutionalStrip } from "@/components/home/institutional-strip";
import { ItalyBrazil } from "@/components/home/italy-brazil";
import { WhatWeDo } from "@/components/home/what-we-do";
import { WhoWeAre } from "@/components/home/who-we-are";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "home");
}

export default async function HomePage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { home, ui } = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} hero={home.hero} logoAlt={ui.logoAlt} />
      <InstitutionalStrip strip={home.institutional} />
      <WhatWeDo content={home.whatWeDo} />
      <ItalyBrazil content={home.italyBrazil} />
      <WhoWeAre locale={locale} content={home.whoWeAre} photoOf={ui.photoOf} />
      <HowWeHelp locale={locale} content={home.howWeHelp} />
      <Impact content={home.impact} />
      <FinalCta locale={locale} content={home.finalCta} />
    </>
  );
}
