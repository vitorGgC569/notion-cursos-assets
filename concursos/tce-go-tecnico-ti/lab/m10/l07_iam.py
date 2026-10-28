# L7. Identidade e acesso: RBAC x ABAC, JWT HS256 e o ataque "alg none", HOTP/TOTP (RFC 4226 e 6238)
import base64, hashlib, hmac, json, struct, time
print("== 1. RBAC (papeis) x ABAC (atributos) ==")
PAPEIS = {"auditor": {"ler_processo"}, "gestor": {"ler_processo", "aprovar"}, "admin": {"ler_processo", "aprovar", "gerir_usuarios"}}
def rbac(papel, acao): return acao in PAPEIS.get(papel, set())
def abac(u, acao, rec):
    return acao == "ler_processo" and u["lotacao"] == rec["orgao"] and u["nivel"] >= rec["sigilo"] and 8 <= u["hora"] < 18
for p, a in (("auditor", "ler_processo"), ("auditor", "aprovar"), ("gestor", "aprovar"), ("estagiario", "ler_processo")):
    print(f"RBAC papel={p:10s} acao={a:13s} -> {'PERMITIDO' if rbac(p, a) else 'NEGADO'}")
rec = {"orgao": "TCE-GO", "sigilo": 2}
for u in ({"lotacao": "TCE-GO", "nivel": 2, "hora": 10}, {"lotacao": "TCE-GO", "nivel": 1, "hora": 10}, {"lotacao": "TCE-GO", "nivel": 3, "hora": 22}, {"lotacao": "TCM-GO", "nivel": 3, "hora": 10}):
    print(f"ABAC usuario={u} recurso={rec} -> {'PERMITIDO' if abac(u, 'ler_processo', rec) else 'NEGADO'}")
print("\n== 2. JWT HS256 montado a mao ==")
b64 = lambda b: base64.urlsafe_b64encode(b).rstrip(b"=").decode()
unb64 = lambda s: base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))
SEG = b"segredo-do-servidor-32-bytes-ok!!!!"
def jwt(h, p, key=SEG):
    a = b64(json.dumps(h, separators=(",", ":")).encode()) + "." + b64(json.dumps(p, separators=(",", ":")).encode())
    sig = b64(hmac.new(key, a.encode(), hashlib.sha256).digest()) if h.get("alg") == "HS256" else ""
    return a + "." + sig
def verif_estrito(tok):
    a, b, s = tok.split(".")
    h = json.loads(unb64(a))
    if h.get("alg") != "HS256": return None, "alg nao permitido: " + str(h.get("alg"))
    esp = b64(hmac.new(SEG, (a + "." + b).encode(), hashlib.sha256).digest())
    if not hmac.compare_digest(s, esp): return None, "assinatura invalida"
    p = json.loads(unb64(b))
    if p["exp"] < 1_700_000_000: return None, "token expirado"
    return p, "ok"
def verif_ingenuo(tok):
    a, b, s = tok.split(".")
    h = json.loads(unb64(a))
    if h.get("alg") == "none": return json.loads(unb64(b)), "aceito sem assinatura (alg none)"
    return verif_estrito(tok)
t = jwt({"alg": "HS256", "typ": "JWT"}, {"sub": "ana", "papel": "servidor", "exp": 2_000_000_000})
print("token:", t[:60] + "...")
print("payload (qualquer um decodifica, nao e segredo):", json.loads(unb64(t.split(".")[1])))
print("verificacao estrita:", verif_estrito(t))
a, b, s = t.split(".")
forj = a + "." + b64(json.dumps({"sub": "ana", "papel": "admin", "exp": 2_000_000_000}, separators=(",", ":")).encode()) + "." + s
print("payload alterado para papel=admin, mesma assinatura ->", verif_estrito(forj))
none = jwt({"alg": "none", "typ": "JWT"}, {"sub": "ana", "papel": "admin", "exp": 2_000_000_000})
print("token com alg=none:", none)
print("verificador INGENUO :", verif_ingenuo(none))
print("verificador ESTRITO :", verif_estrito(none))
print("\n== 3. HOTP (RFC 4226) e TOTP (RFC 6238) com vetores de teste das RFCs ==")
def hotp(secret, counter, digits=6, alg=hashlib.sha1):
    h = hmac.new(secret, struct.pack(">Q", counter), alg).digest()
    o = h[-1] & 0x0F
    return str((struct.unpack(">I", h[o:o+4])[0] & 0x7FFFFFFF) % 10**digits).zfill(digits)
def totp(secret, t, step=30, digits=6, alg=hashlib.sha1): return hotp(secret, int(t // step), digits, alg)
K20 = b"12345678901234567890"
esp4226 = ["755224", "287082", "359152", "969429", "338314"]
print("HOTP contador 0..4:", [hotp(K20, i) for i in range(5)], "== RFC 4226 ?", [hotp(K20, i) for i in range(5)] == esp4226)
for tt, esp in ((59, "94287082"), (1111111109, "07081804"), (1234567890, "89005924")):
    print(f"TOTP SHA-1, T={tt:>10d}, 8 digitos -> {totp(K20, tt, digits=8)} (RFC 6238: {esp}) {'OK' if totp(K20, tt, digits=8) == esp else 'DIFERENTE'}")
sec = b"segredo-do-usuario!!"
agora = 1_800_000_000
cod = totp(sec, agora)
print("codigo de 6 digitos na janela atual:", cod, "| na janela seguinte:", totp(sec, agora + 30), "| 2 janelas depois:", totp(sec, agora + 60))
print("servidor aceita o codigo atual com tolerancia de 1 janela:", cod in {totp(sec, agora + d * 30) for d in (-1, 0, 1)})
print("\n== 4. Limite de tentativas (rate limit) contra forca bruta de OTP de 6 digitos ==")
print("espaco de 6 digitos = 10**6 =", 10**6, "; sem limite, 10 tentativas/s esgotam em", round(10**6 / 10 / 3600, 1), "h; com bloqueio apos 5 erros, a chance de acerto em 5 tentativas e", 5 / 10**6)
