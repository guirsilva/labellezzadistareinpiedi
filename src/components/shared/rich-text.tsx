import { Fragment } from "react";

/** Converte `*trecho*` (ênfase do script) em <em>. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;
        return part.startsWith("*") && part.endsWith("*") ? (
          <em key={key} className="font-medium not-italic text-forest">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={key}>{part}</Fragment>
        );
      })}
    </>
  );
}
