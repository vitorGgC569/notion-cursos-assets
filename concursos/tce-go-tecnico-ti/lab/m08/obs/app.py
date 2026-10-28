import json, random, sys, time, logging
from http.server import BaseHTTPRequestHandler, HTTPServer
from prometheus_client import Counter, Gauge, Histogram, generate_latest, CONTENT_TYPE_LATEST

REQS = Counter("http_requests_total", "Total de requisicoes", ["path", "status"])
FILA = Gauge("fila_pedidos", "Pedidos aguardando na fila (sobe e desce)")
LAT = Histogram("http_request_seconds", "Latencia das requisicoes", buckets=(0.01, 0.05, 0.1, 0.5, 1))

log = logging.getLogger("app")
logging.basicConfig(level=logging.INFO, format="%(message)s", stream=sys.stderr)


class H(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/metrics":
            dados = generate_latest()
            self.send_response(200)
            self.send_header("Content-Type", CONTENT_TYPE_LATEST)
            self.end_headers()
            self.wfile.write(dados)
            return
        ini = time.time()
        FILA.inc()
        time.sleep(random.choice([0.005, 0.02, 0.2]))
        status = 500 if self.path == "/erro" else 200
        FILA.dec()
        REQS.labels(path=self.path, status=str(status)).inc()
        LAT.observe(time.time() - ini)
        log.info(json.dumps({"nivel": "ERROR" if status == 500 else "INFO", "path": self.path,
                             "status": status, "ms": round((time.time() - ini) * 1000)}))
        self.send_response(status)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *a):
        pass


HTTPServer(("127.0.0.1", int(sys.argv[1])), H).serve_forever()
