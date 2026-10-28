# L2. Armazenamento de senhas: sal, derivacao lenta, entropia e forca bruta
import hashlib, math, os, time, secrets
print("== 1. Hash sem sal: senhas iguais geram hashes iguais ==")
for u, s in (("ana", "123456"), ("bruno", "123456"), ("carla", "T!mbre-azul-77")):
    print(f"{u:6s} sha256 = {hashlib.sha256(s.encode()).hexdigest()[:40]}...")
print("\n== 2. Ataque de dicionario contra hash sem sal ==")
alvo = hashlib.sha256(b"senha123").hexdigest()
lista = ["123456", "password", "qwerty", "senha123", "admin", "letmein"]
tabela = {hashlib.sha256(p.encode()).hexdigest(): p for p in lista}
print("hash vazado:", alvo[:40], "...")
print("senha recuperada com tabela pre-calculada de", len(lista), "palavras:", tabela.get(alvo))
print("\n== 3. Com sal aleatorio os hashes diferem (mesma senha) ==")
for u in ("ana", "bruno"):
    sal = secrets.token_bytes(16)
    h = hashlib.pbkdf2_hmac("sha256", b"123456", sal, 600_000)
    print(f"{u:6s} sal={sal.hex()[:16]}... hash={h.hex()[:32]}...")
print("a tabela pre-calculada do item 2 nao serve mais: o sal muda o resultado de cada usuario")
print("\n== 4. Custo: sha256 puro x PBKDF2 x scrypt (tempo medido nesta execucao) ==")
def mede(f, n=1):
    t = time.perf_counter()
    for _ in range(n): f()
    return (time.perf_counter() - t) / n
sal = os.urandom(16)
t_sha = mede(lambda: hashlib.sha256(b"senha123").digest(), 200000)
t_pb1 = mede(lambda: hashlib.pbkdf2_hmac("sha256", b"senha123", sal, 1000), 20)
t_pb6 = mede(lambda: hashlib.pbkdf2_hmac("sha256", b"senha123", sal, 600_000), 2)
t_sc = mede(lambda: hashlib.scrypt(b"senha123", salt=sal, n=2**14, r=8, p=1, maxmem=64*1024*1024), 3)
print(f"sha256 simples        : {t_sha*1e6:10.2f} us por tentativa -> {1/t_sha:14,.0f} tentativas/s")
print(f"PBKDF2 1.000 iter.    : {t_pb1*1e3:10.3f} ms por tentativa -> {1/t_pb1:14,.0f} tentativas/s")
print(f"PBKDF2 600.000 iter.  : {t_pb6*1e3:10.3f} ms por tentativa -> {1/t_pb6:14,.0f} tentativas/s")
print(f"scrypt n=2^14,r=8,p=1 : {t_sc*1e3:10.3f} ms por tentativa -> {1/t_sc:14,.0f} tentativas/s")
print("\n== 5. Entropia (bits) = comprimento x log2(tamanho do alfabeto) ==")
casos = [("8 minusculas", 8, 26), ("8 letras e digitos", 8, 62), ("8 de 94 simbolos imprimiveis", 8, 94), ("12 de 94 simbolos", 12, 94), ("frase de 4 palavras (lista de 7776)", 4, 7776)]
for nome, L, N in casos:
    print(f"{nome:36s} {L*math.log2(N):6.1f} bits  espaco = {N**L:.3e}")
print("\n== 6. Tempo de forca bruta (media = metade do espaco), usando as taxas medidas acima ==")
def fmt(s):
    for un, v in (("anos", 31557600), ("dias", 86400), ("horas", 3600), ("min", 60)):
        if s >= v: return f"{s/v:,.1f} {un}"
    return f"{s:,.3f} s"
for nome, L, N in casos[:4]:
    esp = N**L / 2
    print(f"{nome:30s} sha256 puro: {fmt(esp*t_sha):>22s} | PBKDF2 600k: {fmt(esp*t_pb6):>22s}")
print("(taxas de uma CPU, 1 nucleo, nesta maquina; GPUs e hardware dedicado sao bem mais rapidos. Valores variam a cada execucao.)")
