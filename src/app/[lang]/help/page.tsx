import { HelpForm } from "@/components/help-form/help-form";
import { Section } from "@/components/shared/section";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { buildPageMetadata, type LangParams } from "@/i18n/metadata";

export function generateMetadata({ params }: LangParams) {
  return buildPageMetadata(params, "help");
}

export default async function HelpPage({ params }: LangParams) {
  const { help, ui } = getDictionary(await resolveLocale(params));

  return (
    <Section width="prose" className="min-h-[70vh] pt-24 sm:pt-28">
      <HelpForm
        texts={help}
        ui={{
          next: ui.next,
          previousStep: ui.previousStep,
          required: ui.required,
          invalidEmail: ui.invalidEmail,
          selectAtLeastOne: ui.selectAtLeastOne,
          otherPlaceholder: ui.otherPlaceholder,
          optional: ui.optional,
        }}
      />
    </Section>
  );
}
