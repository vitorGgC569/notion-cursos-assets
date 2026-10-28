import json, os, socket
from http.server import BaseHTTPRequestHandler, HTTPServer

HITS = 0
REDIS_HOST = os.environ.get("REDIS_HOST")


def contar():
    global HITS
    if REDIS_HOST:
        import redis
        return int(redis.Redis(host=REDIS_HOST, socket_connect_timeout=2).incr("hits"))
    HITS += 1
    return HITS


class H(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/saude":
            corpo, codigo = {"status": "ok"}, 200
        else:
            corpo, codigo = {"host": socket.gethostname(), "hits": contar(), "usuario": os.getuid()}, 200
        dados = json.dumps(corpo).encode()
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(dados)

    def log_message(self, *a):
        pass


HTTPServer(("0.0.0.0", 8000), H).serve_forever()
