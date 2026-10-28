#!/usr/bin/env bash
# Pratica 3: CI com GitHub Actions executado localmente com 'act' + actionlint
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock
IMG=ghcr.io/catthehacker/ubuntu:act-22.04
W=/tmp/m8-ci-$$; mkdir -p $W; cp -r "$D/ci-proj/." $W/; cd $W
git init -q -b main; git add -A; tick; git commit -q -m "inicio"
ACT="act -P ubuntu-latest=$IMG --pull=false --artifact-server-path $W/.art --container-daemon-socket -"
fil() { LC_ALL=C sed 's/[\x80-\xff]//g' | grep -E "Job succeeded|Job failed|Run Main|Skipping|Success - Main|Failure - Main|\| (Ran|OK|FAILED|AssertionError|FAIL|test_|calc)|Python 3|W[0-9]{3}|F[0-9]{3}|ouput|deploy simulado|dist|calc.zip|skipped|exit code" | sed -E 's/\[[0-9.]+(ms|s|µs)\]//' | grep -v 'docker exec' | sed -E 's/ +$//'; }
t "0. Versoes"
c "act --version && actionlint -version | head -1 && docker --version"
t "1. actionlint: o workflow esta valido?"
c "cat .github/workflows/ci.yml | head -12"
c "actionlint && echo 'actionlint: sem erros'"
t "2. act -l: o grafo de jobs (needs) como o GitHub o enxerga"
c "act -P ubuntu-latest=$IMG -l 2>/dev/null"
t "3. Execucao completa: lint -> test (matriz) -> build -> deploy"
printf '$ act push (saida filtrada)\n'
$ACT push 2>&1 | fil
t "4. Teste quebrado: a falha para o pipeline (needs) e deploy nao roda"
sed -i 's/return a + b/return a - b/' calc/__init__.py
git commit -qam "bug: soma errada"
printf '$ act push (saida filtrada)\n'
$ACT push 2>&1 | fil
git reset -q --hard HEAD~1
t "5. Falha de lint antes dos testes"
printf 'import os\n' >> calc/__init__.py
git commit -qam "lint: import nao usado"
printf '$ act push (saida filtrada)\n'
$ACT push 2>&1 | fil
git reset -q --hard HEAD~1
t "6. Evento pull_request: a condicao 'if' do deploy"
printf '$ act pull_request (saida filtrada)\n'
$ACT pull_request 2>&1 | fil
t "7. actionlint nos exemplos com erro (inclui o trecho da questao 133 do TCU/2025)"
cd "$D"
c "cat ci-bad/tcu133.yml | head -8"
c "actionlint ci-bad/tcu133.yml"
c "actionlint ci-bad/erros.yml"
cd /
rm -rf $W
