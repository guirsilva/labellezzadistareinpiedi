import { CopyButton } from "@/components/shared/copy-button";
import { InertLink } from "@/components/shared/inert-link";
import { Prose } from "@/components/shared/prose";
import type { Dictionary } from "@/i18n/dictionaries";
import { DonationSteps } from "./donation-steps";
import { ReceiptRequest } from "./receipt-request";

type ItalyPanelProps = {
  /** Sempre o conteúdo do it.json: este painel é exibido em italiano em qualquer idioma. */
  content: Dictionary["donate"]["italy"];
};

/** Agrupa o IBAN de 4 em 4 só para leitura; o valor copiado não tem espaços. */
export function groupIban(iban: string) {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

const cardClass = "rounded-3xl border border-border bg-card p-6 sm:p-8";
const titleClass = "font-heading text-2xl leading-snug text-forest sm:text-3xl";

export function ItalyPanel({ content }: ItalyPanelProps) {
  const { howTo, after, receiptForm, tax } = content;

  return (
    <div lang="it" className="flex flex-col gap-5 sm:gap-6">
      {/* 1. Dados + copiar */}
      <div className="relative overflow-hidden rounded-3xl bg-forest p-6 text-cream sm:p-8">
        <span
          aria-hidden="true"
          className="absolute top-0 left-6 h-1 w-14 bg-gold sm:left-8"
        />
        <dl className="flex flex-col gap-5">
          <div>
            <dt className="font-label text-xs font-semibold tracking-[0.16em] text-cream/70 uppercase">
              {content.holderLabel}
            </dt>
            <dd className="mt-1 font-heading text-xl sm:text-2xl">
              {content.holder}
            </dd>
          </div>
          <div>
            <dt className="font-label text-xs font-semibold tracking-[0.16em] text-cream/70 uppercase">
              {content.ibanLabel}
            </dt>
            <dd className="mt-1 font-label text-xl font-semibold tracking-wider break-words text-gold sm:text-2xl">
              {groupIban(content.iban)}
            </dd>
          </div>
        </dl>
        <CopyButton
          value={content.iban}
          label={content.copyIban}
          toastMessage={content.ibanCopied}
          className="mt-6 w-full sm:w-auto"
        />
      </div>

      {/* 2. Como fazer o bonifico */}
      <div className={cardClass}>
        <h2 className={titleClass}>{howTo.title}</h2>
        <DonationSteps steps={howTo.steps} className="mt-6" />
      </div>

      {/* 3. Pedir a ricevuta */}
      <div className={cardClass}>
        <h2 className={titleClass}>{after.title}</h2>
        <p className="mt-3 mb-6 leading-relaxed text-forest/85">{after.text}</p>
        <ReceiptRequest ctaLabel={after.cta} form={receiptForm} />
      </div>

      {/* 4. Benefícios fiscais */}
      <div className="rounded-3xl border border-sage/40 bg-sage/10 p-6 sm:p-8">
        <h2 className={titleClass}>{tax.title}</h2>
        <p className="mt-3 text-lg leading-relaxed font-medium text-forest">
          {tax.lead}
        </p>
        <Prose paragraphs={tax.paragraphs} className="mt-4 text-forest/85" />
        <InertLink className="mt-5 font-label text-sm font-bold tracking-wider text-forest uppercase">
          {tax.link}
        </InertLink>
      </div>
    </div>
  );
}
