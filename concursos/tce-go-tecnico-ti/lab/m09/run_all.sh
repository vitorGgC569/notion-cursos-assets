#!/usr/bin/env bash
# Executa todas as praticas do Modulo 9 e grava saida-*.txt
cd "$(dirname "$0")"; source ./common.sh
export M9_THREADS=4
for f in l01_tokens_contexto l02_prompts l03_rag_recuperacao l04_embeddings l05_rag_llm l06_agente l07_mcp l08_injecao l09_codigo_ia l10_conferencia; do
  [ -n "$1" ] && [ "$1" != "$f" ] && continue
  { printf '$ python %s.py\n' "$f"; "$PY" -u $f.py 2>&1 | grep -v -E "Fetching|HF_TOKEN|llama_|^ggml|it/s\]"; } > saida-$f.txt
  echo "pronto: $f"
done
