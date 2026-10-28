# L1. Hash, integridade e HMAC
import hashlib, hmac, os, subprocess, tempfile
def bits_diff(a, b):
    return sum(bin(x ^ y).count("1") for x, y in zip(a, b))
print("== 1. Tamanho do digest independe do tamanho da entrada ==")
curto = "Tribunal"
longo = "Tribunal de Contas " * 85
longo = longo[:1600]
for nome in ("md5", "sha1", "sha256", "sha512"):
    h1 = hashlib.new(nome, curto.encode()).hexdigest()
    h2 = hashlib.new(nome, longo.encode()).hexdigest()
    print(f"{nome:7s} entrada de {len(curto):4d} car. -> {len(h1)*4:3d} bits ({len(h1)} hex) | entrada de {len(longo):4d} car. -> {len(h2)*4:3d} bits ({len(h2)} hex)")
print("sha1('Tribunal') =", hashlib.sha1(curto.encode()).hexdigest())
print("\n== 2. Efeito avalanche: trocar 1 bit da entrada ==")
msg = bytearray(b"Pagar R$ 1.000,00 ao fornecedor 0042")
alt = bytearray(msg); alt[10] ^= 0x01
print("original :", msg.decode())
print("alterada :", alt.decode(errors="replace"))
a = hashlib.sha256(msg).digest(); b = hashlib.sha256(alt).digest()
print("sha256 original:", a.hex())
print("sha256 alterada:", b.hex())
print(f"bits diferentes no digest: {bits_diff(a,b)} de 256 ({bits_diff(a,b)/256:.1%}); esperado perto de 50%")
print("\n== 3. Hash simples nao autentica; HMAC exige a chave ==")
chave = b"segredo-compartilhado-32-bytes!!!!"
orig = b"transferir 100 para conta 123"
fals = b"transferir 900 para conta 666"
print("atacante recalcula sha256 da mensagem falsa:", hashlib.sha256(fals).hexdigest()[:32], "... (valido, qualquer um calcula)")
tag = hmac.new(chave, orig, hashlib.sha256).hexdigest()
print("HMAC-SHA256 legitimo   :", tag[:32], "...")
tag_atq = hmac.new(b"chave-errada", fals, hashlib.sha256).hexdigest()
print("HMAC do atacante (sem chave):", tag_atq[:32], "...")
print("receptor confere tag da mensagem falsa com a tag recebida:", hmac.compare_digest(tag, hmac.new(chave, fals, hashlib.sha256).hexdigest()))
print("receptor confere tag da mensagem original:", hmac.compare_digest(tag, hmac.new(chave, orig, hashlib.sha256).hexdigest()))
print("\n== 4. Integridade de arquivo: sha256sum e openssl dgst concordam ==")
d = tempfile.mkdtemp(prefix="m10l1_")
p = os.path.join(d, "relatorio.txt")
open(p, "w").write("Relatorio de auditoria v1\nTotal: 12 achados\n")
def sha256sum(path): return subprocess.run(["sha256sum", path], capture_output=True, text=True).stdout.split()[0]
def ossl(path): return subprocess.run(["openssl", "dgst", "-sha256", path], capture_output=True, text=True).stdout.strip().split("= ")[-1]
h0 = hashlib.sha256(open(p, "rb").read()).hexdigest()
print("python  :", h0)
print("sha256sum:", sha256sum(p))
print("openssl :", ossl(p))
print("os tres iguais?", h0 == sha256sum(p) == ossl(p))
open(p, "a").write("Total: 13 achados\n")
print("apos editar o arquivo, sha256sum:", sha256sum(p))
print("hash mudou?", sha256sum(p) != h0)
