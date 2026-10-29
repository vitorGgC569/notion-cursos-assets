#!/bin/bash
# Roda os laboratorios do modulo 15. Uso: bash run_all.sh [nome_do_lab]  (sem argumento roda todos)
cd "$(dirname "$0")" || exit 1
LABS="l1_fontes l2_edital l3_casos_reais l4_citacoes l5_respostas l6_contador"
[ -n "$1" ] && LABS="$1"
for l in $LABS; do
  { echo "\$ python3 $l.py"; python3 "$l.py"; } > "saida-$l.txt" 2>&1; echo "== $l"; tail -n 6 "saida-$l.txt"
done
