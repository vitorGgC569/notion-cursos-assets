#!/bin/bash
# Roda os laboratorios do modulo 14. Uso: bash run_all.sh [nome_do_lab]  (sem argumento roda todos)
cd "$(dirname "$0")" || exit 1
LABS="l1_fontes l2_provas_reais l3_citacoes l4_questoes l5_vocabulario"
[ -n "$1" ] && LABS="$1"
for l in $LABS; do
  { echo "\$ python3 $l.py"; python3 "$l.py"; } > "saida-$l.txt" 2>&1; echo "== $l"; cat "saida-$l.txt"
done
