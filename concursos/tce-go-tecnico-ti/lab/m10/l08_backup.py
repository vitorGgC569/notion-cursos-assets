# L8. Backup e continuidade: completo, incremental, diferencial, restauracao verificada, RPO/RTO e regra 3-2-1
import hashlib, os, shutil, tarfile, tempfile, json
raiz = tempfile.mkdtemp(prefix="m10l8_"); dados = raiz + "/dados"; bk = raiz + "/bk"; os.makedirs(dados); os.makedirs(bk)
def escreve(nome, txt):
    p = os.path.join(dados, nome); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, "w").write(txt)
def snapshot():
    r = {}
    for dp, _, fs in os.walk(dados):
        for f in fs:
            p = os.path.join(dp, f); r[os.path.relpath(p, dados)] = hashlib.sha256(open(p, "rb").read()).hexdigest()
    return r
def faz_backup(nome, arquivos):
    with tarfile.open(f"{bk}/{nome}.tar.gz", "w:gz") as t:
        for a in arquivos: t.add(os.path.join(dados, a), arcname=a)
    return os.path.getsize(f"{bk}/{nome}.tar.gz"), len(arquivos)
def restaura(nomes, destino):
    shutil.rmtree(destino, ignore_errors=True); os.makedirs(destino)
    for n in nomes:
        with tarfile.open(f"{bk}/{n}.tar.gz") as t: t.extractall(destino, filter="data")
def snap_dir(d):
    r = {}
    for dp, _, fs in os.walk(d):
        for f in fs:
            p = os.path.join(dp, f); r[os.path.relpath(p, d)] = hashlib.sha256(open(p, "rb").read()).hexdigest()
    return r
for i in range(10): escreve(f"proc/p{i:02d}.txt", ("processo %d\n" % i) * 400)
print("== 1. Dia 0 (domingo): backup completo ==")
s0 = snapshot(); tam, n = faz_backup("completo_d0", list(s0)); print(f"completo_d0: {n} arquivos, {tam} bytes")
ref_full = s0; ultimo_inc = s0
cenas = [("d1", {"proc/p01.txt": "alterado d1\n" * 400, "proc/novo_d1.txt": "novo d1\n" * 300}),
         ("d2", {"proc/p02.txt": "alterado d2\n" * 400}),
         ("d3", {"proc/p03.txt": "alterado d3\n" * 400, "proc/novo_d3.txt": "novo d3\n" * 300})]
tabela = []
print("\n== 2. Dias 1 a 3: incremental (desde o ULTIMO backup) x diferencial (desde o ULTIMO COMPLETO) ==")
for dia, mud in cenas:
    for k, v in mud.items(): escreve(k, v)
    s = snapshot()
    inc = [a for a in s if ultimo_inc.get(a) != s[a]]
    dif = [a for a in s if ref_full.get(a) != s[a]]
    ti, ni = faz_backup(f"inc_{dia}", inc); td, nd = faz_backup(f"dif_{dia}", dif)
    ultimo_inc = s
    tabela.append((dia, ni, ti, nd, td))
    print(f"{dia}: incremental = {ni} arquivo(s), {ti} bytes | diferencial = {nd} arquivo(s), {td} bytes")
print("\n== 3. Restauracao do dia 3: quantos conjuntos sao necessarios? ==")
final = snapshot()
restaura(["completo_d0", "inc_d1", "inc_d2", "inc_d3"], raiz + "/r_inc")
print("completo + incrementais d1, d2, d3 = 4 conjuntos; identico ao original?", snap_dir(raiz + "/r_inc") == final)
restaura(["completo_d0", "dif_d3"], raiz + "/r_dif")
print("completo + ultimo diferencial d3    = 2 conjuntos; identico ao original?", snap_dir(raiz + "/r_dif") == final)
restaura(["completo_d0", "inc_d1", "inc_d3"], raiz + "/r_falha")
print("sem o incremental d2 (elo da cadeia perdido): identico ao original?", snap_dir(raiz + "/r_falha") == final)
print("\n== 4. Verificacao de integridade do proprio backup ==")
manifesto = {n: hashlib.sha256(open(f"{bk}/{n}.tar.gz", "rb").read()).hexdigest() for n in ("completo_d0", "dif_d3")}
print("manifesto SHA-256 gravado:", {k: v[:16] + "..." for k, v in manifesto.items()})
with open(f"{bk}/dif_d3.tar.gz", "r+b") as f: f.seek(40); b = f.read(1); f.seek(40); f.write(bytes([b[0] ^ 0xFF]))
atual = hashlib.sha256(open(f"{bk}/dif_d3.tar.gz", "rb").read()).hexdigest()
print("apos corromper 1 byte do dif_d3, o hash confere?", atual == manifesto["dif_d3"], "-> restauracao so deve usar copia que confere")
print("\n== 5. RPO, RTO e regra 3-2-1 ==")
def rpo(freq_horas): return f"RPO maximo = {freq_horas} h (perda possivel de ate {freq_horas} h de dados)"
for f in (24, 4, 1): print("backup a cada", f, "h ->", rpo(f))
print("RTO = tempo maximo aceitavel para restaurar o servico. Ele vem da analise de impacto (BIA) e determina o tipo de backup e de infraestrutura; nao e medido por este script.")
def tres_dois_um(copias): return len(copias) >= 3 and len({m for m, _ in copias}) >= 2 and any(fora for _, fora in copias)
cenarios = {"so um HD externo na mesma sala": [("hd", False)], "original + 2 copias no mesmo NAS": [("nas", False), ("nas", False), ("nas", False)], "original + copia em NAS + copia na nuvem": [("disco", False), ("nas", False), ("nuvem", True)]}
for k, v in cenarios.items(): print(f"{k:45s} atende 3-2-1? {tres_dois_um(v)}")
shutil.rmtree(raiz); print("\ndiretorio temporario apagado")
