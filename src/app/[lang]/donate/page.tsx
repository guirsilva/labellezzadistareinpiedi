import { BrazilPanel } from "@/components/donate/brazil-panel";
import { DonationChooser } from "@/components/donate/donation-chooser";
import { ItalyPanel } from "@/components/donate/italy-panel";
import { CtaGroup } from "@/components/shared/cta-group";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { href } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "donate");
}

export default async function DonatePage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { donate } = getDictionary(locale);
  // O painel Itália é sempre exibido em italiano.
  const italy = getDictionary("it").donate.italy;
  const { afterDonation, thanks } = donate;

  return (
    <>
      <Section width="prose" className="pt-24 sm:pt-28">
        <div className="animate-reveal text-center">
          <SectionHeading level="h1" title={donate.title} align="center" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-forest/85 sm:text-xl">
            {donate.intro}
          </p>
        </div>
        <div className="mt-12 sm:mt-16">
          <DonationChooser
            italyLabel={donate.chooseItaly}
            brazilLabel={donate.chooseBrazil}
            italyPanel={<ItalyPanel content={italy} />}
            brazilPanel={<BrazilPanel content={donate.brazil} />}
          />
        </div>
      </Section>

      <Section tone="sand" width="prose" aria-labelledby="depois-da-doacao">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading id="depois-da-doacao" title={afterDonation.title} />
          <Prose
            paragraphs={afterDonation.paragraphs}
            size="lg"
            className="text-forest/85"
          />
          <CtaGroup
            className="mt-2"
            ctas={[
              {
                label: afterDonation.ctaStories,
                href: href(locale, "stories"),
                variant: "forest",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="forest" width="prose" aria-labelledby="obrigado">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <span aria-hidden="true" className="h-px w-16 bg-gold" />
          <SectionHeading
            id="obrigado"
            title={thanks.title}
            tone="dark"
            align="center"
          />
          <p className="font-heading text-2xl leading-snug text-gold italic sm:text-3xl">
            {thanks.paragraphs[0]}
          </p>
          <Prose
            paragraphs={thanks.paragraphs.slice(1)}
            size="lg"
            className="text-cream/85"
          />
        </Reveal>
      </Section>
    </>
  );
}
