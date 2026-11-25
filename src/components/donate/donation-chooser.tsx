"use client";

import { ChevronDownIcon, LandmarkIcon, SendIcon } from "lucide-react";
import { type ReactNode, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Choice = "italy" | "brazil";

type DonationChooserProps = {
  italyLabel: string;
  brazilLabel: string;
  italyPanel: ReactNode;
  brazilPanel: ReactNode;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Dois botões lado a lado; cada um abre o seu painel logo abaixo.
 * Os dois painéis ficam montados (ocultos) para não perder o que foi preenchido.
 */
export function DonationChooser({
  italyLabel,
  brazilLabel,
  italyPanel,
  brazilPanel,
}: DonationChooserProps) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const options: { key: Choice; label: string; icon: ReactNode }[] = [
    {
      key: "italy",
      label: italyLabel,
      icon: <LandmarkIcon aria-hidden="true" className="size-6" />,
    },
    {
      key: "brazil",
      label: brazilLabel,
      icon: <SendIcon aria-hidden="true" className="size-6" />,
    },
  ];

  const select = (key: Choice) => {
    const next = choice === key ? null : key;
    setChoice(next);
    if (next) {
      requestAnimationFrame(() =>
        panelsRef.current?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        }),
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {options.map((option) => {
          const active = choice === option.key;
          return (
            <button
              key={option.key}
              id={`${baseId}-${option.key}-tab`}
              type="button"
              aria-expanded={active}
              aria-controls={`${baseId}-${option.key}-panel`}
              onClick={() => select(option.key)}
              className={cn(
                "group flex flex-col items-center justify-center gap-3 rounded-3xl border px-3 py-6 text-center transition-all duration-300 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:gap-4 sm:py-9",
                active
                  ? "border-forest bg-forest text-cream shadow-lg shadow-forest/15"
                  : "border-border bg-card text-forest hover:-translate-y-1 hover:border-sage hover:shadow-md hover:shadow-forest/5",
              )}
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl transition-colors sm:size-14",
                  active ? "bg-gold text-forest" : "bg-sage/15 text-forest",
                )}
              >
                {option.icon}
              </span>
              <span className="font-label text-[0.95rem] leading-tight font-bold tracking-wide uppercase sm:text-lg">
                {option.label}
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className={cn(
                  "size-5 transition-transform duration-300",
                  active ? "rotate-180 text-gold" : "text-sage",
                )}
              />
            </button>
          );
        })}
      </div>

      <div ref={panelsRef} className="scroll-mt-24">
        {options.map((option) => (
          <section
            key={option.key}
            id={`${baseId}-${option.key}-panel`}
            aria-labelledby={`${baseId}-${option.key}-tab`}
            hidden={choice !== option.key}
            className="mt-6 animate-in duration-500 fade-in slide-in-from-top-2 sm:mt-8"
          >
            {option.key === "italy" ? italyPanel : brazilPanel}
          </section>
        ))}
      </div>
    </div>
  );
}
