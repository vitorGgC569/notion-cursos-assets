#!/usr/bin/env bash
# Funcoes comuns das praticas do Modulo 8. Use com: source common.sh
export PYTHONDONTWRITEBYTECODE=1
# c "comando"  -> imprime "$ comando" e executa, mostrando a saida (stdout e stderr)
# t "titulo"   -> imprime um titulo de secao
c() { printf '$ %s\n' "$1"; bash -c "$1" 2>&1; local rc=$?; [ $rc -ne 0 ] && printf '[codigo de saida %d]\n' "$rc"; return 0; }
t() { printf '\n--- %s ---\n' "$1"; }
# datas e identidade fixas deixam os hashes do Git iguais em toda execucao
export GIT_AUTHOR_NAME="Ana Dev" GIT_AUTHOR_EMAIL="ana@exemplo.test" GIT_COMMITTER_NAME="Ana Dev" GIT_COMMITTER_EMAIL="ana@exemplo.test"
_n=0
tick() { _n=$((_n+1)); export GIT_AUTHOR_DATE="2026-01-0$((_n%9+1))T10:00:00-03:00" GIT_COMMITTER_DATE="2026-01-0$((_n%9+1))T10:00:00-03:00"; }
