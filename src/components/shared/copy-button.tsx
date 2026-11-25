"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label: string;
  /** Mensagem do toast de confirmação (ex.: "IBAN COPIATO ✓"). */
  toastMessage: string;
  variant?: "gold" | "outline-forest";
  className?: string;
};

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fallback para navegadores/contextos sem Clipboard API
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

/** Copia um valor e confirma com um toast breve. */
export function CopyButton({
  value,
  label,
  toastMessage,
  variant = "gold",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    const ok = await copyToClipboard(value);
    if (!ok) return;
    toast(toastMessage, { duration: 2200 });
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size="cta-sm"
      onClick={handleClick}
      className={cn("min-w-36", className)}
    >
      {copied ? (
        <CheckIcon aria-hidden="true" className="size-4" />
      ) : (
        <CopyIcon aria-hidden="true" className="size-4" />
      )}
      {label}
    </Button>
  );
}
