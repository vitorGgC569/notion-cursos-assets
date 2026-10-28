#!/usr/bin/env bash
# Executa todas as praticas do Modulo 10 e grava saida-*.txt (so espaco do usuario; nada de root)
cd "$(dirname "$0")"; source ./common.sh
for f in l01_hash_integridade l02_senhas l03_cripto_simetrica l04_cripto_assimetrica l05_pki l06_aplicacoes l07_iam l08_backup l09_risco_firewall_ids l10_conferencia; do
  [ -n "$1" ] && [ "$1" != "$f" ] && continue
  if [ "$f" = l05_pki ]; then { printf '$ bash l05_pki.sh\n'; bash l05_pki.sh 2>&1; } > saida-$f.txt
  else { printf '$ python %s.py\n' "$f"; "$PY" -u $f.py 2>&1; } > saida-$f.txt; fi
  echo "pronto: $f"
done
