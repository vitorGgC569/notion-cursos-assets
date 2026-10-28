#!/usr/bin/env bash
# Pratica 6: Docker Compose (healthcheck, depends_on, volume, escala, ambientes por arquivo)
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock
W=/tmp/m8-comp-$$; mkdir -p $W; cp -r "$D/dk-app" "$D/compose.yaml" $W/; cd $W
echo "# execucao $$" >> dk-app/requirements.txt
LIMPA() { cd $W; docker compose down -v --rmi local >/dev/null 2>&1; docker rmi -f m8do/app:comp >/dev/null 2>&1; }
trap LIMPA EXIT
t "1. O arquivo compose.yaml"
c "cat compose.yaml"
c "docker compose version --short && docker compose config --quiet && echo 'compose config: arquivo valido'"
t "2. Sobe a pilha: o web espera o Redis ficar saudavel"
c "docker compose up -d --build 2>&1 | grep -E 'Container|Network|Volume' | sed -E 's/ +[0-9.]+s$//; s/ +$//' | awk '!v[\$0]++'"
sleep 4
c "docker compose ps --format '{{.Service}}: {{.State}} ({{.Health}})'"
c "curl -s localhost:15802/; echo; curl -s localhost:15802/; echo; curl -s localhost:15802/; echo"
t "3. O contador mora no Redis e no volume, nao no container web"
c "docker compose restart web 2>&1 | grep -E 'Restart' | tail -1"
sleep 3
c "curl -s localhost:15802/; echo"
c "docker compose rm -sf cache 2>&1 | grep -E 'Removed|Stopped' | head -1"
c "docker compose up -d cache 2>&1 | grep -E 'Started|Healthy|Running' | head -2"
sleep 3
c "curl -s localhost:15802/; echo"
t "4. Variaveis e override por ambiente"
cat > compose.dev.yaml <<'Y'
services:
  web:
    environment:
      MODO: desenvolvimento
Y
c "docker compose -f compose.yaml -f compose.dev.yaml config | grep -A4 'web:' | head -6"
t "5. Logs e encerramento"
c "docker compose logs cache 2>&1 | grep -E 'Ready to accept|Redis version' | head -2 | cut -c1-110"
c "docker compose down -v 2>&1 | grep -E 'Removed|Stopped' | sed -E 's/ +[0-9.]+s$//; s/ +$//' | sort -u"
c "docker ps -a --filter name=m8do-comp -q | wc -l"
