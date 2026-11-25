"use client";

import { CircleCheckIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SuccessMessageProps = {
  title: string;
  paragraphs?: readonly string[];
  className?: string;
};

/** Substitui os campos após o envio. Recebe o foco para ser anunciada por leitores de tela. */
export function SuccessMessage({
  title,
  paragraphs = [],
  className,
}: SuccessMessageProps) {
  const ref = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <output
      ref={ref}
      tabIndex={-1}
      className={cn(
        "flex animate-in flex-col items-start gap-4 rounded-3xl border border-sage/40 bg-card p-6 duration-500 fade-in slide-in-from-bottom-2 outline-none sm:p-8",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-sage/15 text-forest">
        <CircleCheckIcon aria-hidden="true" className="size-6" />
      </span>
      <p className="font-heading text-2xl leading-snug text-forest sm:text-3xl">
        {title}
      </p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-forest/85">
          {paragraph}
        </p>
      ))}
    </output>
  );
}
