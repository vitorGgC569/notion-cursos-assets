# L9. Risco (ALE), filtro de pacotes simulado (sem tocar no firewall real), deteccao de forca bruta em log e varredura so das portas locais
import socket, threading, collections, random, math
print("== 1. Analise quantitativa de risco: SLE = AV x EF; ALE = SLE x ARO ==")
ativos = [("Servidor de processos (indisponibilidade)", 500_000, 0.40, 0.5), ("Base de pessoal (vazamento)", 800_000, 0.25, 0.2), ("Estacao de usuario (ransomware)", 6_000, 1.00, 3.0)]
tot = 0
for nome, av, ef, aro in ativos:
    sle = av * ef; ale = sle * aro; tot += ale
    print(f"{nome:44s} AV=R$ {av:>9,.2f} EF={ef:4.0%} SLE=R$ {sle:>10,.2f} ARO={aro:3.1f}/ano ALE=R$ {ale:>10,.2f}")
print(f"ALE total = R$ {tot:,.2f}")
print("Controle que custa R$ 40.000/ano e reduz o ARO do servidor de 0,5 para 0,1:", end=" ")
antes = 500_000 * 0.40 * 0.5; depois = 500_000 * 0.40 * 0.1
print(f"economia de ALE = R$ {antes-depois:,.2f}; vale a pena? {antes-depois > 40_000}")
print("\n== 2. Filtro de pacotes SEM estado (ACL) x COM estado (stateful), simulado em Python ==")
Regra = collections.namedtuple("Regra", "acao proto dst_porta origem")
regras = [Regra("permitir", "tcp", 443, "qualquer"), Regra("permitir", "tcp", 22, "10.0.0.0/8")]
def em_rede(ip, cidr):
    if cidr == "qualquer": return True
    base, m = cidr.split("/"); m = int(m)
    ipn = lambda s: int.from_bytes(bytes(int(x) for x in s.split(".")), "big")
    return (ipn(ip) >> (32 - m)) == (ipn(base) >> (32 - m))
def acl(p):
    for r in regras:
        if p["proto"] == r.proto and p["dport"] == r.dst_porta and em_rede(p["src"], r.origem): return r.acao
    return "negar (regra padrao: default deny)"
pacotes = [dict(src="200.1.1.1", dst="10.1.1.5", proto="tcp", dport=443, flags="SYN"), dict(src="200.1.1.1", dst="10.1.1.5", proto="tcp", dport=22, flags="SYN"),
           dict(src="10.2.2.2", dst="10.1.1.5", proto="tcp", dport=22, flags="SYN"), dict(src="200.1.1.1", dst="10.1.1.5", proto="tcp", dport=3306, flags="SYN"),
           dict(src="200.1.1.1", dst="10.1.1.5", proto="tcp", dport=443, flags="ACK"),
           dict(src="203.0.113.5", dst="10.1.1.5", proto="tcp", dport=443, flags="ACK")]
print("ACL sem estado (olha cada pacote isolado, so cabecalhos):")
for p in pacotes: print(f"  {p['src']:>13s} -> {p['dst']}:{p['dport']:<5d} {p['flags']:3s} => {acl(p)}")
tabela = set()
def stateful(p):
    chave = (p["src"], p["dst"], p["dport"]) 
    ret = (p["dst"], p["src"], p["dport"])
    if p["flags"] == "SYN" and acl(p) == "permitir": tabela.add(chave); return "permitir e registrar conexao"
    if p["flags"] == "ACK" and (p["src"], p["dst"], p["dport"]) in tabela: return "permitir (pertence a conexao registrada)"
    if p["flags"] == "ACK": return "negar (ACK sem conexao estabelecida)"
    return "negar (regra padrao)"
print("Stateful (mantem tabela de conexoes):")
for p in pacotes: print(f"  {p['src']:>13s} -> {p['dst']}:{p['dport']:<5d} {p['flags']:3s} => {stateful(p)}")
print("\n== 3. Deteccao de forca bruta em log de autenticacao (logica de IDS por assinatura/limiar) ==")
random.seed(10)
log = []
for seg in range(0, 600, 5):
    log.append((seg, "10.0.0.%d" % random.randint(2, 40), "ok" if random.random() > 0.15 else "falha"))
for seg in range(200, 230):
    log.append((seg, "203.0.113.66", "falha"))
log.sort()
print("eventos no log:", len(log))
LIM, JAN = 10, 60
falhas = collections.defaultdict(list)
for t, ip, r in log:
    if r == "falha": falhas[ip].append(t)
alertas = []
for ip, ts in falhas.items():
    for i, t0 in enumerate(ts):
        n = sum(1 for t in ts[i:] if t - t0 < JAN)
        if n >= LIM: alertas.append((ip, t0, n)); break
print(f"regra: >= {LIM} falhas do mesmo IP em {JAN} s")
for ip, t0, n in alertas: print(f"ALERTA: {ip} a partir de t={t0}s com {n} falhas na janela -> bloquear/limitar (resposta de um IPS)")
print("IPs com falhas isoladas (abaixo do limiar, sem alerta):", sorted(ip for ip in falhas if ip not in {a[0] for a in alertas})[:5], "...")
print("\n== 4. Varredura de portas SO em 127.0.0.1, em portas que este proprio script abre ==")
ls = []
for _ in range(3):
    s = socket.socket(); s.bind(("127.0.0.1", 0)); s.listen(1); ls.append(s)
abertas = sorted(s.getsockname()[1] for s in ls)
res = []
testar = sorted(set(list(range(abertas[0] - 5, abertas[0] + 6)) + abertas))
print("portas testadas:", len(testar), "(as 3 abertas pelo script e as 5 vizinhas de cada lado da primeira)")
for p in testar:
    c = socket.socket(); c.settimeout(0.2)
    if c.connect_ex(("127.0.0.1", p)) == 0: res.append(p)
    c.close()
print("portas abertas que o script criou:", abertas)
print("portas encontradas pela varredura (conexao TCP completa):", res)
print("todas as portas abertas encontradas?", set(abertas) <= set(res))
for s in ls: s.close()
print("(alvo unico: o proprio localhost. Nenhuma outra maquina e nenhuma ferramenta externa, como nmap, foram usadas.)")
