import { SimpleForm } from "@/components/forms/simple-form";
import { Prose } from "@/components/shared/prose";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "contact");
}

export default async function ContactPage({ params }: LangParams) {
  const { contact, ui } = getDictionary(await resolveLocale(params));
  const { fields } = contact;

  return (
    <Section width="prose" className="pt-24 sm:pt-28">
      <div className="flex animate-reveal flex-col gap-6">
        <SectionHeading level="h1" title={contact.title} />
        <Prose
          paragraphs={contact.paragraphs}
          size="lg"
          className="text-forest/85"
        />
      </div>

      <Reveal className="mt-14 flex flex-col gap-6">
        <h2 className="font-label text-sm font-bold tracking-[0.18em] text-navy uppercase">
          {contact.formTitle}
        </h2>
        <SimpleForm
          idPrefix="contato"
          submitLabel={contact.submit}
          successMessage={contact.success}
          messages={{ required: ui.required, invalidEmail: ui.invalidEmail }}
          fields={[
            {
              kind: "text",
              name: "name",
              label: fields.name,
              autoComplete: "name",
            },
            {
              kind: "text",
              name: "email",
              label: fields.email,
              type: "email",
              autoComplete: "email",
              half: true,
            },
            {
              kind: "text",
              name: "phone",
              label: fields.phone,
              type: "tel",
              autoComplete: "tel",
              half: true,
            },
            {
              kind: "text",
              name: "country",
              label: fields.country,
              autoComplete: "country-name",
            },
            {
              kind: "radio",
              name: "subject",
              label: fields.subject,
              options: contact.subjects,
            },
            { kind: "textarea", name: "message", label: fields.message },
          ]}
        />
      </Reveal>
    </Section>
  );
}
