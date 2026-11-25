import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorId, inputClass } from "./field-shell";

export type OtherOption = {
  /** Valor da opção que abre o campo de texto (ex.: "other"). */
  value: string;
  name: string;
  text: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  /** Rótulo acessível do campo (normalmente o mesmo da opção "Outro"). */
  ariaLabel: string;
  error?: string;
};

type OtherInputProps = {
  other: OtherOption;
  idPrefix: string;
};

/** Campo de texto que aparece ao marcar "Outro". */
export function OtherInput({ other, idPrefix }: OtherInputProps) {
  const id = `${idPrefix}-${other.name}`;
  return (
    <div className="flex animate-in flex-col gap-2 duration-300 fade-in slide-in-from-top-1">
      <Input
        id={id}
        name={other.name}
        data-field={other.name}
        value={other.text}
        onChange={(event) => other.onTextChange(event.target.value)}
        placeholder={other.placeholder}
        aria-label={other.ariaLabel}
        aria-required="true"
        aria-invalid={other.error ? true : undefined}
        aria-describedby={other.error ? errorId(id) : undefined}
        className={cn(inputClass)}
      />
      {other.error ? (
        <p id={errorId(id)} className="text-sm font-medium text-destructive">
          {other.error}
        </p>
      ) : null}
    </div>
  );
}
