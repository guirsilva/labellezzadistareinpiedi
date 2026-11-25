# Fondazione La Bellezza di Stare in Piedi — site

Next.js 16 (App Router) · TypeScript · Tailwind 4 · shadcn/ui · Biome.

**Status:** primeira versão (somente visual) — 7 páginas em IT/PT, formulários com envio simulado.

## Estrutura

```
messages/            pt.json (script) · it.json (tradução)
src/proxy.ts         idioma padrão + slugs traduzidos
src/i18n/            rotas, dicionários, metadata
src/app/[lang]/      layout (navbar, rodapé, seta de voltar) + páginas
src/components/
  layout/            navbar, menu mobile, seletor PT/IT, rodapé, seta de voltar
  shared/            seções, títulos, listas, linha do tempo, placeholders, copiar, animação
  forms/             campos, consentimento, sucesso, formulário simples
  home/ donate/ help-form/   seções específicas
```

Todas as animações respeitam a configuração "reduzir movimento" do sistema.

## Rodar localmente

```bash
npm run dev
```

Abra http://localhost:3000. O endereço redireciona para `/it` (italiano é o idioma padrão).

## Idiomas

| Arquivo | Origem | Status |
|---|---|---|
| `messages/pt.json` | Textos literais do script (`DESCRIPTION.md`) | Fonte |
| `messages/it.json` | Tradução do `pt.json` | ⚠️ **PENDENTE DE REVISÃO HUMANA** |

- Nenhum texto do site fica fixo nos componentes; tudo vem desses dois arquivos.
- O painel **"Doar da Itália"** da página Doe é sempre exibido em italiano (`donate.italy`), independentemente do idioma escolhido. Esse bloco é idêntico nos dois arquivos.
- O bloco `ui` (rótulos de acessibilidade, botões de etapa, mensagens de validação, 404) **não vem do script**: são microtextos criados para a interface funcionar e também devem ser revisados.
- O passo **SWIFT/BIC** do painel Brasil fica oculto enquanto o valor estiver vazio (`donate.brazil.steps[5].lines[0]`).

## Rotas

| Página | Italiano | Português |
|---|---|---|
| Home | `/it` | `/pt` |
| Doe | `/it/dona` | `/pt/doe` |
| Transparência | `/it/trasparenza` | `/pt/transparencia` |
| Histórias | `/it/storie` | `/pt/historias` |
| Contato | `/it/contatti` | `/pt/contato` |
| Parceiros | `/it/partner` | `/pt/parceiros` |
| Formulário (Preciso de ajuda) | `/it/richiedi-aiuto` | `/pt/preciso-de-ajuda` |

Os slugs ficam em `src/i18n/config.ts`. O `src/proxy.ts` faz a tradução de slug → pasta interna (`src/app/[lang]/<chave>`).

## Pendências conhecidas

- Logo: usado o PNG atual (`public/images/logo.png`, fundo verde) dentro de um selo. Substituir por versão com fundo transparente quando houver.
- Fotos: espaços reservados cinza até recebermos as imagens.
- Política de Privacidade, Informativa sulla privacy e "Scopri di più sui benefici fiscali": links ainda sem destino.
- Formulários: envio apenas simulado.

## Verificação

```bash
npx tsc --noEmit
npm run lint
```
