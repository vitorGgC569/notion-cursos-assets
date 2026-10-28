# Parte Python da L5: handshake TLS local (127.0.0.1) com os certificados criados pelo openssl
import socket, ssl, sys, threading
d = sys.argv[1]
srv_ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
srv_ctx.minimum_version = ssl.TLSVersion.TLSv1_2
srv_ctx.load_cert_chain(f"{d}/servidor.crt", f"{d}/servidor.key")
ls = socket.socket(); ls.bind(("127.0.0.1", 0)); ls.listen(5); porta = ls.getsockname()[1]
def servidor():
    while True:
        try:
            c, _ = ls.accept()
        except OSError:
            return
        try:
            with srv_ctx.wrap_socket(c, server_side=True) as s:
                s.sendall(b"ola do servidor TLS\n")
        except (ssl.SSLError, OSError):
            pass
threading.Thread(target=servidor, daemon=True).start()
print(f"servidor TLS local em 127.0.0.1:{porta} (so nesta maquina)")
def cliente(titulo, cafile, host):
    ctx = ssl.create_default_context(cafile=cafile) if cafile else ssl.create_default_context()
    try:
        with socket.create_connection(("127.0.0.1", porta), timeout=5) as raw:
            with ctx.wrap_socket(raw, server_hostname=host) as s:
                cert = s.getpeercert()
                subj = dict(x[0] for x in cert["subject"]); emis = dict(x[0] for x in cert["issuer"])
                print(f"[{titulo}] OK: {s.version()}, cifra {s.cipher()[0]}, servidor CN={subj['commonName']}, emissor CN={emis['commonName']}, SAN={[v for k,v in cert['subjectAltName']]}")
                print(f"[{titulo}] mensagem recebida:", s.recv(100).decode().strip())
    except ssl.SSLCertVerificationError as e:
        print(f"[{titulo}] FALHOU: {e.verify_message} (codigo {e.verify_code})")
    except ssl.SSLError as e:
        print(f"[{titulo}] FALHOU: {e}")
cliente("1. cliente confia na CA do curso e o nome confere", f"{d}/ca.crt", "localhost")
cliente("2. cliente nao conhece a CA (so as CAs do sistema)", None, "localhost")
cliente("3. CA correta, mas o nome pedido nao esta no certificado", f"{d}/ca.crt", "outro.exemplo.gov.br")
ls.close()
