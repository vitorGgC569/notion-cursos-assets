#!/usr/bin/env bash
# Funcoes comuns das praticas do Modulo 9. Use com: source common.sh
export PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
export M9_THREADS=${M9_THREADS:-3}
PY=${PY:-/workspace/m9tools/bin/python}
c() { printf '$ %s\n' "$1"; bash -c "$1" 2>&1; local rc=$?; [ $rc -ne 0 ] && printf '[codigo de saida %d]\n' "$rc"; return 0; }
t() { printf '\n--- %s ---\n' "$1"; }
