/** Substitui `{chave}` em textos como "Etapa {current}/{total}". Seguro para componentes cliente. */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
