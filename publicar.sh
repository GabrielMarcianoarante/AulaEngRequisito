#!/usr/bin/env bash
# Envia o site para um repositório do GitHub com um comando.
#
# Uso (rode DENTRO da pasta do projeto, no Git Bash):
#   bash publicar.sh                 -> envia para a branch "site-conecta-escola" (não mexe no que já existe)
#   bash publicar.sh --main          -> coloca o site na branch principal (pede confirmação)
#   bash publicar.sh OUTRA_URL       -> usa outro repositório
#
# Nunca envia: node_modules, .next, .env, forms.local.json (links e tokens), cartazes.html.
set -euo pipefail

REPO="https://github.com/GabrielMarcianoarante/AulaEngRequisito"
MODO="branch"
for a in "$@"; do
  case "$a" in
    --main) MODO="main" ;;
    *://*|git@*) REPO="$a" ;;
    *) echo "Opção desconhecida: $a"; exit 1 ;;
  esac
done
ORIGEM="${PROJETO:-$(pwd)}"
BRANCH_NOVA="site-conecta-escola"

erro() { echo "ERRO: $*" >&2; exit 1; }
command -v git >/dev/null || erro "Git não encontrado. Instale em https://git-scm.com (no Windows, use o Git Bash)."
[ -f "$ORIGEM/package.json" ] || erro "Rode dentro da pasta do projeto (onde fica o package.json)."
git config user.name >/dev/null || erro "Configure seu nome:  git config --global user.name \"Seu Nome\""
git config user.email >/dev/null || erro "Configure seu e-mail:  git config --global user.email \"voce@email.com\""

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
echo "→ Baixando o repositório: $REPO"
git clone "$REPO" "$TMP/repo" 2>"$TMP/erro.txt" || { cat "$TMP/erro.txt"; erro "Não consegui acessar o repositório. Confira o link e se você está logado no GitHub (veja o fim deste arquivo)."; }
cd "$TMP/repo"

if [ -n "$(git ls-remote --heads origin)" ]; then
  PADRAO="$(git remote show origin | sed -n 's/^ *HEAD branch: //p')"
  { [ -n "$PADRAO" ] && [ "$PADRAO" != "(unknown)" ]; } || PADRAO="$(git ls-remote --heads origin | head -1 | sed 's#.*refs/heads/##')"
  if [ "$MODO" = "main" ]; then
    echo "ATENÇÃO: isto vai SUBSTITUIR os arquivos da branch '$PADRAO' pelo site (o histórico antigo continua no Git)."
    read -r -p "Digite SIM para continuar: " ok; [ "$ok" = "SIM" ] || erro "Cancelado."
    BRANCH="$PADRAO"; git checkout -q "$PADRAO"
  else
    BRANCH="$BRANCH_NOVA"
    if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then git checkout -q -B "$BRANCH" "origin/$BRANCH"
    else git checkout -q "$PADRAO"; git checkout -q -b "$BRANCH"; fi
  fi
  git rm -rq . 2>/dev/null || true
else
  BRANCH="main"; git checkout -q -b main      # repositório vazio
fi

echo "→ Copiando o site (sem segredos)..."
( cd "$ORIGEM" && tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./.env --exclude='./.env.*' \
    --exclude=./forms.local.json --exclude=./cartazes.html --exclude='*.zip' -cf - . ) | tar -xf -
cp "$ORIGEM/.env.example" . 2>/dev/null || true

git add -A
# trava de segurança: nada de links/tokens no repositório
if git diff --cached --name-only | grep -Eq '(^|/)(forms\.local\.json|\.env|cartazes\.html)$'; then erro "Arquivo secreto detectado. Envio cancelado."; fi
git diff --cached --quiet && erro "Nada novo para enviar."
git commit -q -m "Site Conecta Escola: atualização $(date +%Y-%m-%d)"
echo "→ Enviando para a branch '$BRANCH'..."
git push -u origin "$BRANCH"

echo
echo "Pronto! Site enviado para: $REPO (branch $BRANCH)"
echo "Próximos passos:"
echo "  1) Render:  New > Blueprint > esse repositório (branch $BRANCH). Preencha FORMS_JSON."
echo "  2) Vercel:  New Project > esse repositório (branch $BRANCH). Crie BACKEND_URL = endereço da Render."
[ "$BRANCH" = "main" ] || echo "  (Se preferir, no GitHub abra um Pull Request de $BRANCH para a main e use a main nas hospedagens.)"
# Se o login falhar: instale o GitHub CLI e rode 'gh auth login', ou use o Git Credential Manager (o Git for Windows abre o login pelo navegador).
# Nunca cole token de acesso em chats ou dentro de arquivos do projeto.
