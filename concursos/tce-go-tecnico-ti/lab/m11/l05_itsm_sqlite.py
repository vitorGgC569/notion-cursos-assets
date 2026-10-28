# L5. (dados sinteticos, gerados com semente fixa) Gestao de servicos (ITIL 4 / ISO 20000) em SQLite: CMDB, incidentes, problemas e mudancas, com matriz de prioridade e SLA
import sqlite3, random
db = sqlite3.connect(":memory:"); c = db.cursor()
c.executescript("""
CREATE TABLE ci(id INTEGER PRIMARY KEY, nome TEXT, tipo TEXT, servico TEXT);
CREATE TABLE incidente(id INTEGER PRIMARY KEY, ci_id INT REFERENCES ci(id), impacto INT, urgencia INT, abertura INT, resolucao INT, problema_id INT);
CREATE TABLE problema(id INTEGER PRIMARY KEY, titulo TEXT, causa_raiz TEXT);
CREATE TABLE mudanca(id INTEGER PRIMARY KEY, ci_id INT REFERENCES ci(id), tipo TEXT, sucesso INT, causou_incidente INT);
""")
cis = [("srv-app-01","servidor","Sistema de processos"),("srv-app-02","servidor","Sistema de processos"),("db-prod","banco","Sistema de processos"),
       ("fw-borda","rede","Acesso a internet"),("sw-core","rede","Acesso a internet"),("srv-mail","servidor","E-mail"),("vpn-gw","rede","Acesso remoto")]
c.executemany("INSERT INTO ci(nome,tipo,servico) VALUES(?,?,?)", cis)
c.executemany("INSERT INTO problema(titulo,causa_raiz) VALUES(?,?)", [("Lentidao recorrente do sistema de processos","indice ausente no banco"),("Quedas do VPN","firmware com falha de memoria")])
rnd = random.Random(2026)
for i in range(40):  # 40 incidentes em 20 dias; minutos desde o inicio
    ci = rnd.choice([1,1,1,2,3,3,3,4,5,6,7,7]); imp = rnd.choice([1,2,2,3]); urg = rnd.choice([1,2,3,3])
    ab = rnd.randint(0, 20 * 1440); dur = int(rnd.expovariate(1/ (60 * (imp + urg)))) + 5
    prob = 1 if ci in (1,2,3) and rnd.random() < .6 else (2 if ci == 7 and rnd.random() < .8 else None)
    c.execute("INSERT INTO incidente(ci_id,impacto,urgencia,abertura,resolucao,problema_id) VALUES(?,?,?,?,?,?)", (ci, imp, urg, ab, ab + dur, prob))
rnd = random.Random(77)
for i in range(60):
    tipo = rnd.choice(["padrao","padrao","normal","normal","normal","emergencia"]); ok = rnd.random() < {"padrao":.97,"normal":.88,"emergencia":.7}[tipo]
    c.execute("INSERT INTO mudanca(ci_id,tipo,sucesso,causou_incidente) VALUES(?,?,?,?)", (rnd.randint(1,7), tipo, int(ok), int((not ok) and rnd.random()<.6)))
PRI = {(1,1):"P1",(1,2):"P1",(2,1):"P1",(1,3):"P2",(2,2):"P2",(3,1):"P2",(2,3):"P3",(3,2):"P3",(3,3):"P4"}
META = {"P1": 60, "P2": 240, "P3": 480, "P4": 1440}  # minutos para resolver (SLA hipotetico)
print("== 1. Matriz de prioridade (impacto x urgencia; 1 = alto) e meta de resolucao ==")
for k, v in sorted(PRI.items()): print(f"impacto {k[0]} x urgencia {k[1]} -> {v} (meta {META[v]} min)")
rows = c.execute("SELECT i.id,ci.nome,ci.servico,i.impacto,i.urgencia,i.resolucao-i.abertura,i.problema_id FROM incidente i JOIN ci ON ci.id=i.ci_id").fetchall()
print("\n== 2. Incidentes por prioridade: volume, MTTR e violacao do SLA ==")
agg = {}
for _, nome, srv, imp, urg, dur, pb in rows:
    p = PRI[(imp, urg)]; a = agg.setdefault(p, [0, 0, 0]); a[0] += 1; a[1] += dur; a[2] += dur > META[p]
for p in sorted(agg): n, tot, vio = agg[p]; print(f"{p}: {n:>2} incidentes | MTTR = {tot/n:7.1f} min | violaram o SLA: {vio} ({vio/n:.0%})")
tot_n = sum(a[0] for a in agg.values()); tot_v = sum(a[2] for a in agg.values())
print(f"Total: {tot_n} incidentes, {tot_v} fora do SLA ({tot_v/tot_n:.0%}); MTTR geral = {sum(a[1] for a in agg.values())/tot_n:.1f} min")
print("\n== 3. Candidatos a problema: CI com 3 ou mais incidentes (consulta SQL) ==")
for r in c.execute("SELECT ci.nome,COUNT(*) n,ROUND(AVG(i.resolucao-i.abertura),1) FROM incidente i JOIN ci ON ci.id=i.ci_id GROUP BY ci.id HAVING n>=3 ORDER BY n DESC"): print(f"{r[0]:12s} incidentes={r[1]}  MTTR={r[2]} min")
print("\n== 4. Incidentes ligados a problemas conhecidos ==")
for r in c.execute("SELECT p.titulo,p.causa_raiz,COUNT(i.id) FROM problema p LEFT JOIN incidente i ON i.problema_id=p.id GROUP BY p.id"): print(f"{r[0]} | causa raiz: {r[1]} | incidentes: {r[2]}")
print("\n== 5. Mudancas (change enablement): taxa de sucesso por tipo e incidentes causados ==")
for r in c.execute("SELECT tipo,COUNT(*),SUM(sucesso),SUM(causou_incidente) FROM mudanca GROUP BY tipo ORDER BY 1"): print(f"{r[0]:11s} total={r[1]:>2} sucesso={r[2]:>2} ({r[2]/r[1]:.0%}) causaram incidente={r[3]}")
print("\n== 6. Impacto de um CI no servico (CMDB): quais servicos dependem de cada CI ==")
for r in c.execute("SELECT servico,GROUP_CONCAT(nome,', ') FROM ci GROUP BY servico ORDER BY 1"): print(f"{r[0]:22s} <- {r[1]}")
