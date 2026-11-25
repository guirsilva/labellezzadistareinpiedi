"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { SuccessMessage } from "@/components/forms/success-message";
import { Prose } from "@/components/shared/prose";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/lib/format";
import {
  type FieldErrors,
  focusFirstError,
  hasErrors,
  withoutError,
} from "@/lib/forms";
import {
  type HelpFormValues,
  initialValues,
  type StepNumber,
  TOTAL_STEPS,
  validateStep,
} from "./state";
import { type SetField, StepFields } from "./step-fields";

type HelpFormProps = {
  texts: Dictionary["help"];
  ui: Pick<
    Dictionary["ui"],
    | "next"
    | "previousStep"
    | "required"
    | "invalidEmail"
    | "selectAtLeastOne"
    | "otherPlaceholder"
    | "optional"
  >;
};

type Mode = "intro" | "form" | "sent";

function scrollIntoViewRespectingMotion(element: HTMLElement | null) {
  if (!element) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Formulário "Preciso de ajuda": introdução → 5 etapas (uma por vez) → confirmação.
 * O envio é apenas simulado nesta versão.
 */
export function HelpForm({ texts, ui }: HelpFormProps) {
  const [mode, setMode] = useState<Mode>("intro");
  const [step, setStep] = useState<StepNumber>(1);
  const [values, setValues] = useState<HelpFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldFocus = useRef(false);

  // Após trocar de etapa/tela: rola para o topo e leva o foco ao título.
  // biome-ignore lint/correctness/useExhaustiveDependencies: roda a cada troca de etapa ou tela
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    scrollIntoViewRespectingMotion(rootRef.current);
    headingRef.current?.focus({ preventScroll: true });
  }, [mode, step]);

  const goTo = (nextMode: Mode, nextStep: StepNumber = step) => {
    shouldFocus.current = true;
    setErrors({});
    setMode(nextMode);
    setStep(nextStep);
  };

  const setField: SetField = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => withoutError(current, key));
  };

  const validateCurrent = (): boolean => {
    const nextErrors = validateStep(step, values, ui);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      // espera o React pintar as mensagens antes de focar
      requestAnimationFrame(() => {
        if (formRef.current) focusFirstError(formRef.current, nextErrors);
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCurrent()) return;
    if (step < TOTAL_STEPS) {
      goTo("form", (step + 1) as StepNumber);
      return;
    }
    if (!consent) return;
    // Envio ainda não implementado: apenas simula o sucesso.
    goTo("sent");
  };

  const handleBack = () => {
    if (step === 1) goTo("intro", 1);
    else goTo("form", (step - 1) as StepNumber);
  };

  const stepTitles = [
    texts.step1.title,
    texts.step2.title,
    texts.step3.title,
    texts.step4.title,
    texts.step5.title,
  ];

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {mode === "intro" ? (
        <div className="flex animate-in flex-col gap-10 duration-500 fade-in">
          <div className="flex flex-col gap-6">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-heading text-4xl leading-[1.1] font-medium text-forest outline-none sm:text-5xl"
            >
              {texts.intro.title}
            </h1>
            <Prose
              paragraphs={texts.intro.paragraphs}
              size="lg"
              className="text-forest/85"
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="absolute top-0 left-6 h-1 w-14 bg-gold sm:left-8"
            />
            <h2 className="font-heading text-2xl text-forest sm:text-3xl">
              {texts.before.title}
            </h2>
            <Prose
              paragraphs={texts.before.paragraphs}
              className="mt-4 text-forest/85"
            />
          </div>
          <Button
            type="button"
            variant="gold"
            size="cta"
            onClick={() => goTo("form", 1)}
            className="w-full sm:w-auto sm:self-start"
          >
            {texts.start}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Button>
        </div>
      ) : null}

      {mode === "form" ? (
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-5 shadow-sm shadow-forest/5 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              aria-label={ui.previousStep}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-5" />
            </button>
            <div className="flex flex-1 flex-col gap-2">
              <p className="font-label text-sm font-bold tracking-[0.16em] text-navy uppercase">
                {format(texts.progress, { current: step, total: TOTAL_STEPS })}
              </p>
              <Progress
                value={(step / TOTAL_STEPS) * 100}
                aria-label={format(texts.progress, {
                  current: step,
                  total: TOTAL_STEPS,
                })}
                className="h-1.5 bg-sand [&_[data-slot=progress-indicator]]:bg-sage [&_[data-slot=progress-indicator]]:duration-500"
              />
            </div>
          </div>

          <div
            key={step}
            className="mt-8 flex animate-in flex-col gap-7 duration-500 fade-in slide-in-from-right-4"
          >
            <div className="flex flex-col gap-2">
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="font-heading text-2xl leading-snug text-forest outline-none sm:text-3xl"
              >
                {stepTitles[step - 1]}
              </h1>
              {step === 1 ? (
                <p className="font-label text-sm font-semibold tracking-wide text-forest/70">
                  {texts.step1.subtitle}
                </p>
              ) : null}
            </div>

            <StepFields
              step={step}
              values={values}
              errors={errors}
              setField={setField}
              texts={texts}
              ui={ui}
            />

            {step === TOTAL_STEPS ? (
              <ConsentCheckbox
                id="ajuda-consent"
                text={texts.step5.consent}
                checked={consent}
                onCheckedChange={setConsent}
              />
            ) : null}
          </div>

          <div className="mt-10 flex justify-end">
            {step < TOTAL_STEPS ? (
              <Button
                type="submit"
                variant="forest"
                size="cta"
                className="w-full sm:w-auto"
              >
                {ui.next}
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="gold"
                size="cta"
                disabled={!consent}
                className="w-full sm:w-auto"
              >
                {texts.submit}
              </Button>
            )}
          </div>
        </form>
      ) : null}

      {mode === "sent" ? (
        <SuccessMessage
          title={texts.success.title}
          paragraphs={texts.success.paragraphs}
        />
      ) : null}
    </div>
  );
}
