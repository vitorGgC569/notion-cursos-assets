#!/usr/bin/env bash
# Executa as praticas do Modulo 12 e grava saida-*.txt (so Python 3 padrao; sem root, sem rede, sem instalar nada)
cd "$(dirname "$0")"; export PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1; PY=${PY:-python3}
for f in l1_indice_lotce l2_prazos_lotce l3_dias_uteis l4_conferir_citacoes l5_conferir_questoes l6_estrutura l7_politicas; do
  [ -n "$1" ] && [ "$1" != "$f" ] && continue
  { printf '$ python %s.py\n' "$f"; "$PY" -u $f.py 2>&1; } > saida-$f.txt
  echo "pronto: $f"
done
