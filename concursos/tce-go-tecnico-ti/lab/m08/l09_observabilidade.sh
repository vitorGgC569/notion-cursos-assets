#!/usr/bin/env bash
# Pratica 9: observabilidade - metricas (Prometheus), logs estruturados, traces (OpenTelemetry) e Grafana
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")/obs" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock
PY=/workspace/m8tools/obsvenv/bin/python
W=/tmp/m8-obs-$$; mkdir -p $W; cp $D/* $W/; cd $W
LIMPA() { docker rm -f m8do-prom >/dev/null 2>&1; [ -n "$APPPID" ] && kill $APPPID 2>/dev/null; }
trap LIMPA EXIT
PROM=http://127.0.0.1:15809
q() { curl -s -G "$PROM/api/v1/query" --data-urlencode "query=$1" | python3 -c "import sys,json; r=json.load(sys.stdin)['data']['result']; [print(x['metric'], x['value'][1]) for x in r]"; }
t "1. Aplicacao instrumentada: counter, gauge e histogram"
c "grep -nE 'Counter\\(|Gauge\\(|Histogram\\(' app.py | cut -c1-110"
$PY app.py 15810 2> $W/app.log & APPPID=$!
sleep 1.5
for i in $(seq 1 30); do curl -s -o /dev/null localhost:15810/home; done
for i in $(seq 1 6); do curl -s -o /dev/null localhost:15810/erro; done
for i in $(seq 1 10); do curl -s -o /dev/null localhost:15810/api; done
c "curl -s localhost:15810/metrics | grep -E '^(http_requests_total|fila_pedidos|http_request_seconds_count|# TYPE (http_requests_total|fila_pedidos|http_request_seconds))'"
t "2. Logs estruturados em JSON: cada linha e um evento consultavel"
c "head -3 app.log"
c "python3 -c \"import json; L=[json.loads(l) for l in open('app.log')]; print('eventos:',len(L),' erros:',sum(1 for x in L if x['nivel']=='ERROR'))\""
t "3. Prometheus: configuracao e regra de alerta validadas com promtool"
c "docker run --rm -v $W:/etc/prometheus --entrypoint promtool prom/prometheus:latest check config /etc/prometheus/prometheus.yml 2>&1 | sed 's#/etc/prometheus/##'"
c "docker run --rm -v $W:/etc/prometheus --entrypoint promtool prom/prometheus:latest check rules /etc/prometheus/regras.yml 2>&1 | sed 's#/etc/prometheus/##'"
t "4. Prometheus coletando (scrape) a aplicacao"
docker run -d --name m8do-prom --network host -v $W/prometheus.yml:/etc/prometheus/prometheus.yml:ro -v $W/regras.yml:/etc/prometheus/regras.yml:ro prom/prometheus:latest --config.file=/etc/prometheus/prometheus.yml --web.listen-address=127.0.0.1:15809 >/dev/null
sleep 12
c "curl -s $PROM/api/v1/targets | python3 -c \"import sys,json; [print(t['labels']['job'], t['health']) for t in json.load(sys.stdin)['data']['activeTargets']]\""
(for i in $(seq 1 12); do curl -s -o /dev/null localhost:15810/erro; sleep 0.4; done) &
LP=$!
sleep 6
printf '$ PromQL: sum by (status) (http_requests_total)\n'; q 'sum by (status) (http_requests_total)'
printf '$ PromQL: fila_pedidos  (gauge: sobe e desce, volta a zero)\n'; q 'fila_pedidos'
printf '$ PromQL: histogram_quantile(0.95, sum by (le) (rate(http_request_seconds_bucket[1m])))\n'; q 'histogram_quantile(0.95, sum by (le) (rate(http_request_seconds_bucket[1m])))' | sed -E 's/\{\} ([0-9.]+).*/p95 (s) = \1/'
wait $LP
sleep 4
t "5. Alerta disparado pela regra (taxa de erros 500)"
c "curl -s $PROM/api/v1/rules | python3 -c \"import sys,json; r=json.load(sys.stdin)['data']['groups'][0]['rules'][0]; print(r['name'], r['state'], r['health'])\""
c "curl -s $PROM/api/v1/alerts | python3 -c \"import sys,json; a=json.load(sys.stdin)['data']['alerts']; print(len(a),'alerta(s):', [x['labels']['alertname']+'/'+x['state'] for x in a])\""
t "6. Counter nunca diminui; gauge sobe e desce (questao 101 do BCB)"
c "$PY -c \"
from prometheus_client import Counter, Gauge
c=Counter('chamadas','x'); g=Gauge('conexoes','y')
c.inc(3); g.inc(5); g.dec(2)
try:
    c.inc(-1)
except ValueError as e: print('counter.inc(-1) ->', e)
print('gauge apos inc(5) e dec(2):', g._value.get())
\""
t "7. Traces: spans de uma requisicao compartilham o trace_id (OpenTelemetry)"
c "$PY traces.py"
t "8. Grafana: padroes de escuta (questao 134 do TCU/2025)"
c "docker run --rm --entrypoint sh grafana/grafana:latest -c \"grep -nE '^;?(http_addr|http_port) ' /usr/share/grafana/conf/defaults.ini\""
