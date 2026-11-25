"use client";

import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import { FieldShell } from "./field-shell";

type FileFieldProps = {
  name: string;
  label: string;
  chooseLabel: string;
  emptyLabel: string;
  accept?: string;
  idPrefix?: string;
};

/** Anexo opcional com botão estilizado e nome do arquivo escolhido. */
export function FileField({
  name,
  label,
  chooseLabel,
  emptyLabel,
  accept,
  idPrefix = "f",
}: FileFieldProps) {
  const id = `${idPrefix}-${name}`;
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <FieldShell id={id} label={label}>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          data-field={name}
          className="peer sr-only"
          onChange={(event) =>
            setFileName(event.currentTarget.files?.[0]?.name ?? null)
          }
        />
        <label
          htmlFor={id}
          className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-forest/30 bg-card px-4 font-label text-sm font-semibold tracking-wide text-forest uppercase transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:border-forest hover:bg-forest hover:text-cream"
        >
          <PaperclipIcon aria-hidden="true" className="size-4" />
          {chooseLabel}
        </label>
        <span className="min-w-0 truncate text-sm text-forest/70">
          {fileName ?? emptyLabel}
        </span>
      </div>
    </FieldShell>
  );
}
