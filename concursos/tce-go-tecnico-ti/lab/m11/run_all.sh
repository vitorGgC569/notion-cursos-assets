#!/usr/bin/env bash
# Executa todas as praticas do Modulo 11 e grava saida-*.txt (so Python 3 padrao; nada de root, rede ou instalacao)
cd "$(dirname "$0")"; source ./common.sh
for f in l01_evm_valor_agregado l02_caminho_critico_pert l03_portfolio_valor l04_sla_disponibilidade l05_itsm_sqlite l06_kanban_scrum l07_cobit_objetivos l08_contratacao_tic l09_riscos_projeto l10_conferencia; do
  [ -n "$1" ] && [ "$1" != "$f" ] && continue
  { printf '$ python %s.py\n' "$f"; "$PY" -u $f.py 2>&1; } > saida-$f.txt
  echo "pronto: $f"
done
