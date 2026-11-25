import { InfoIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { DonationSteps } from "./donation-steps";

type BrazilPanelProps = {
  content: Dictionary["donate"]["brazil"];
};

export function BrazilPanel({ content }: BrazilPanelProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <p className="text-lg leading-relaxed text-forest">{content.intro}</p>
      <h2 className="mt-8 font-label text-sm font-bold tracking-[0.16em] text-navy uppercase">
        {content.stepsTitle}
      </h2>
      <DonationSteps steps={content.steps} className="mt-5" />
      <p className="mt-8 flex items-start gap-3 rounded-2xl bg-sand px-4 py-3 text-sm leading-relaxed text-forest/85">
        <InfoIcon
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-navy"
        />
        {content.note}
      </p>
    </div>
  );
}
