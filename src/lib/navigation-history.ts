/**
 * Histórico de navegação interno (por aba, em sessionStorage).
 * Usado pela seta de voltar: se houver uma página anterior dentro do site,
 * volta para ela; senão, leva para a Home.
 */
const STACK_KEY = "lb:history";
const REPLACE_KEY = "lb:replace";
const MAX_ENTRIES = 50;

function readStack(): string[] {
  try {
    const raw = sessionStorage.getItem(STACK_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeStack(stack: string[]) {
  try {
    sessionStorage.setItem(
      STACK_KEY,
      JSON.stringify(stack.slice(-MAX_ENTRIES)),
    );
  } catch {
    // armazenamento indisponível (ex.: navegação privada): a seta leva à Home
  }
}

/** Marca que a próxima navegação substitui a página atual (ex.: troca de idioma). */
export function markNextNavigationAsReplace() {
  try {
    sessionStorage.setItem(REPLACE_KEY, "1");
  } catch {
    // ignora
  }
}

function consumeReplaceFlag(): boolean {
  try {
    const flag = sessionStorage.getItem(REPLACE_KEY) === "1";
    sessionStorage.removeItem(REPLACE_KEY);
    return flag;
  } catch {
    return false;
  }
}

export function recordVisit(path: string, isHistoryTraversal: boolean) {
  const stack = readStack();
  if (stack.at(-1) === path) return;

  const isReplace = consumeReplaceFlag();
  if (isReplace && stack.length > 0) {
    stack[stack.length - 1] = path;
  } else if (isHistoryTraversal && stack.at(-2) === path) {
    stack.pop();
  } else {
    stack.push(path);
  }
  writeStack(stack);
}

export function hasPreviousPage(): boolean {
  return readStack().length > 1;
}
