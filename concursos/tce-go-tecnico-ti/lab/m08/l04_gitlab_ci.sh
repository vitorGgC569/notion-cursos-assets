#!/usr/bin/env bash
# Pratica 4: o equivalente local do GitLab CI (gitlab-ci-local) e a palavra-chave workflow
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock
GCL=/workspace/m8tools/gcl; GL="$GCL/node_modules/.bin/node $GCL/node_modules/gitlab-ci-local/dist/index.js --no-color"
W=/tmp/m8-gl-$$; mkdir -p $W; cp -r "$D/gl-proj/." $W/; cd $W
git init -q -b main; git config user.email ana@exemplo.test; git config user.name 'Ana Dev'; git remote add origin https://gitlab.exemplo.test/grupo/calc.git; git add -A; tick; git commit -q -m inicio; git update-ref refs/remotes/origin/main HEAD; git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main
fil() { grep -v -E "^\s*$|pulled|copied|exported|imported|json schema|parsing and" | sed -E 's/^(.* finished in) .*$/\1/; s/ +$//; s/\x1b\[[0-9;]*m//g'; }
t "1. Versao e lista de jobs (stages, needs, quando executa)"
printf "$ gitlab-ci-local --version\n"; $GL --version
printf '$ gitlab-ci-local --list\n'; $GL --list 2>&1 | fil
t "2. Executa o pipeline inteiro (ramo main)"
printf '$ gitlab-ci-local (saida filtrada)\n'; $GL 2>&1 | fil | cut -c1-150
t "3. Um job isolado com suas dependencias"
printf '$ gitlab-ci-local --needs empacota\n'; $GL --needs empacota 2>&1 | fil | cut -c1-150
t "4. rules: os jobs de deploy so existem no ramo main"
git switch -q -c experimento
printf '$ gitlab-ci-local --list (ramo experimento: sem deploy)\n'; $GL --list 2>&1 | fil | cut -c1-150
cd /; rm -rf $W
