import {
  CalendarHeartIcon,
  HandCoinsIcon,
  HandshakeIcon,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { SimpleForm } from "@/components/forms/simple-form";
import { BulletList } from "@/components/shared/bullet-list";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "partners");
}

const FORM_ID = "formulario-parceria";

function SupportCard({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: LucideIcon;
  title?: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sage/60 hover:shadow-lg hover:shadow-forest/5 sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-sage/15 text-forest">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        {title ? (
          <h3 className="font-heading text-2xl text-forest">{title}</h3>
        ) : null}
        <div className="flex flex-col gap-4 text-forest/85">{children}</div>
      </article>
    </Reveal>
  );
}

export default async function PartnersPage({ params }: LangParams) {
  const { partners, ui } = getDictionary(await resolveLocale(params));
  const {
    hero,
    ways,
    fund,
    campaigns,
    outcomes,
    tracked,
    responsibility,
    bridge,
    form,
  } = partners;
  const f = form.fields;

  return (
    <>
      {/* Abertura */}
      <Section width="default" className="pt-24 sm:pt-28">
        <div className="flex max-w-3xl animate-reveal flex-col gap-6">
          <SectionHeading level="h1" title={hero.title} />
          <Prose
            paragraphs={hero.paragraphs}
            size="lg"
            className="text-forest/85"
          />
          <Button
            asChild
            variant="gold"
            size="cta"
            className="mt-2 w-full sm:w-auto sm:self-start"
          >
            <a href={`#${FORM_ID}`}>{hero.cta}</a>
          </Button>
        </div>
      </Section>

      {/* Formas de apoiar */}
      <Section tone="sand" width="wide" aria-labelledby="formas-de-apoiar">
        <Reveal>
          <SectionHeading id="formas-de-apoiar" title={ways.title} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          <SupportCard icon={HandCoinsIcon} delay={0}>
            <Prose paragraphs={ways.paragraphs} />
          </SupportCard>
          <SupportCard icon={HandshakeIcon} title={fund.title} delay={110}>
            <Prose paragraphs={fund.paragraphs} />
          </SupportCard>
          <SupportCard
            icon={CalendarHeartIcon}
            title={campaigns.title}
            delay={220}
          >
            <Prose paragraphs={campaigns.paragraphs} />
            <p className="font-label text-sm font-bold tracking-[0.14em] text-navy uppercase">
              {campaigns.listIntro}
            </p>
            <BulletList items={campaigns.list} />
            <p>{campaigns.closing}</p>
          </SupportCard>
        </div>
      </Section>

      {/* O que gera + impacto acompanhado */}
      <Section width="wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <h3 className="font-heading text-3xl text-forest sm:text-4xl">
              {outcomes.title}
            </h3>
            <p className="leading-relaxed text-forest/85">{outcomes.intro}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {outcomes.list.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-card p-4 leading-snug text-forest transition-colors hover:border-sage/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <h3 className="font-heading text-3xl text-forest sm:text-4xl">
              {tracked.title}
            </h3>
            <Prose paragraphs={tracked.paragraphs} className="text-forest/85" />
            <p className="font-label text-sm font-bold tracking-[0.14em] text-navy uppercase">
              {tracked.listIntro}
            </p>
            <BulletList items={tracked.list} className="text-forest/85" />
            <p className="leading-relaxed text-forest/85">{tracked.closing}</p>
          </Reveal>
        </div>
      </Section>

      {/* Responsabilidade + ponte */}
      <Section tone="forest" width="wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <h3 className="font-heading text-3xl text-cream sm:text-4xl">
              {responsibility.title}
            </h3>
            <Prose
              paragraphs={responsibility.paragraphs.slice(0, 2)}
              className="text-cream/85"
            />
            <p className="border-l-2 border-gold pl-5 font-heading text-2xl leading-snug text-cream italic">
              {responsibility.paragraphs.slice(2).join(" ")}
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <h3 className="font-heading text-3xl text-cream sm:text-4xl">
              {bridge.title}
            </h3>
            <Prose paragraphs={bridge.paragraphs} className="text-cream/85" />
          </Reveal>
        </div>
      </Section>

      {/* Formulário */}
      <Section
        width="prose"
        id={FORM_ID}
        aria-labelledby="parceria-titulo"
        className="scroll-mt-16"
      >
        <Reveal className="flex flex-col gap-6">
          <SectionHeading id="parceria-titulo" title={form.title} />
          <p className="text-lg leading-relaxed text-forest/85">{form.intro}</p>
          <SimpleForm
            idPrefix="parceria"
            submitLabel={form.submit}
            successMessage={form.success}
            messages={{ required: ui.required, invalidEmail: ui.invalidEmail }}
            fields={[
              {
                kind: "text",
                name: "name",
                label: f.name,
                autoComplete: "name",
                half: true,
              },
              {
                kind: "text",
                name: "company",
                label: f.company,
                autoComplete: "organization",
                half: true,
              },
              {
                kind: "text",
                name: "role",
                label: f.role,
                autoComplete: "organization-title",
                half: true,
              },
              {
                kind: "text",
                name: "email",
                label: f.email,
                type: "email",
                autoComplete: "email",
                half: true,
              },
              {
                kind: "text",
                name: "phone",
                label: f.phone,
                type: "tel",
                autoComplete: "tel",
                half: true,
              },
              {
                kind: "text",
                name: "country",
                label: f.country,
                autoComplete: "country-name",
                half: true,
              },
              {
                kind: "radio",
                name: "contribution",
                label: f.contribution,
                options: form.contributionOptions,
              },
              { kind: "textarea", name: "idea", label: f.idea },
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
