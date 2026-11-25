import { InfoPopover } from "@/components/shared/info-popover";
import type { Dictionary } from "@/i18n/dictionaries";

type InstitutionalStripProps = {
  strip: Dictionary["home"]["institutional"];
};

/** Faixa institucional logo abaixo do Hero. */
export function InstitutionalStrip({ strip }: InstitutionalStripProps) {
  const items = [
    <span key="foundation">{strip.foundation}</span>,
    <span key="runts">
      {strip.registeredPrefix}{" "}
      <InfoPopover term={strip.runts} content={strip.runtsTooltip} />
    </span>,
    <span key="seat">{strip.seat}</span>,
    <span key="operation">{strip.operation}</span>,
  ];

  return (
    <div className="border-b border-border bg-sand">
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 font-label text-[0.8rem] font-semibold tracking-[0.12em] text-navy uppercase sm:px-6 md:flex md:items-center md:justify-center md:gap-0 md:py-6 md:text-sm">
        {items.map((item, index) => (
          <li key={item.key} className="flex items-center gap-2 md:gap-0">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rotate-45 bg-gold md:hidden"
            />
            {item}
            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className="hidden px-5 text-gold md:inline"
              >
                •
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
