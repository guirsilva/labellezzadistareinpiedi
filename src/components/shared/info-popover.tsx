"use client";

import { type PointerEvent, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type InfoPopoverProps = {
  term: string;
  content: string;
  className?: string;
};

/**
 * Termo com explicação curta: abre ao passar o mouse (desktop)
 * e ao tocar/clicar (celular e teclado).
 */
export function InfoPopover({ term, content, className }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const lastPointer = useRef<string>("");

  const onPointerEnter = (event: PointerEvent) => {
    lastPointer.current = event.pointerType;
    if (event.pointerType === "mouse") setOpen(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={(event) => {
          lastPointer.current = event.pointerType;
        }}
        onClick={(event) => {
          // no desktop o hover já abriu: o clique não deve fechar
          if (lastPointer.current === "mouse" && open) event.preventDefault();
        }}
        className={cn(
          "cursor-help underline decoration-current/50 decoration-dotted underline-offset-4 transition-colors hover:decoration-current focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          className,
        )}
      >
        {term}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={8}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="w-auto max-w-64 rounded-xl bg-forest px-3.5 py-2.5 text-center font-sans text-sm leading-snug font-normal tracking-normal text-cream normal-case shadow-lg ring-0"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
