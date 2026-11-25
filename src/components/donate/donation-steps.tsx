import { CopyButton } from "@/components/shared/copy-button";
import { RichText } from "@/components/shared/rich-text";
import { cn } from "@/lib/utils";

export type DonationStep = {
  text: string;
  lines: readonly string[];
  copy: { label: string; value: string; toast: string } | null;
};

type DonationStepsProps = {
  steps: readonly DonationStep[];
  className?: string;
};

/**
 * Passo a passo da transferência. Um passo cujas linhas de dado estão todas
 * vazias (ex.: SWIFT/BIC ainda não informado) fica oculto, e a numeração se ajusta.
 */
export function DonationSteps({ steps, className }: DonationStepsProps) {
  const visible = steps.filter(
    (step) =>
      step.lines.length === 0 || step.lines.some((line) => line.trim() !== ""),
  );

  return (
    <ol className={cn("flex flex-col gap-5", className)}>
      {visible.map((step, index) => (
        <li key={step.text} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest font-label text-sm font-bold text-cream"
          >
            {index + 1}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1 leading-relaxed text-forest/90">
            <p>
              <RichText text={step.text} />
            </p>
            {step.lines.length > 0 ? (
              <div className="rounded-2xl bg-sand px-4 py-3 font-label text-[0.95rem] font-semibold tracking-wide break-words text-forest">
                {step.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
            {step.copy ? (
              <CopyButton
                value={step.copy.value}
                label={step.copy.label}
                toastMessage={step.copy.toast}
                variant="outline-forest"
                className="self-start"
              />
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
