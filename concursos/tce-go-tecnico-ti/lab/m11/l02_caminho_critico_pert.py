# L2. Cronograma: caminho critico (CPM), folgas e PERT (tres pontos), com simulacao de Monte Carlo (semente fixa)
import random, statistics
# atividade: (duracao em dias, predecessoras)
A = {"A": (3, []), "B": (4, ["A"]), "C": (2, ["A"]), "D": (5, ["B"]), "E": (3, ["B", "C"]), "F": (4, ["D", "E"]), "G": (2, ["F"])}
ordem = list(A)  # ja em ordem topologica
ES, EF, LS, LF = {}, {}, {}, {}
for a in ordem:
    d, pr = A[a]; ES[a] = max([EF[p] for p in pr], default=0); EF[a] = ES[a] + d
fim = max(EF.values())
suc = {a: [b for b in A if a in A[b][1]] for a in A}
for a in reversed(ordem):
    d, _ = A[a]; LF[a] = min([LS[s] for s in suc[a]], default=fim); LS[a] = LF[a] - d
print("== 1. CPM: passagem para frente e para tras ==")
print("ativ dur  ES  EF  LS  LF  folga critica")
for a in ordem:
    f = LS[a] - ES[a]; print(f"{a:>4} {A[a][0]:>3} {ES[a]:>3} {EF[a]:>3} {LS[a]:>3} {LF[a]:>3} {f:>5}  {'sim' if f == 0 else ''}")
crit = [a for a in ordem if LS[a] == ES[a]]
print("Caminho critico:", " -> ".join(crit), "| duracao do projeto =", fim, "dias")
print("\n== 2. PERT: duracao esperada e desvio-padrao por atividade (o, m, p) ==")
T = {"A": (2, 3, 4), "B": (3, 4, 7), "C": (1, 2, 3), "D": (3, 5, 9), "E": (2, 3, 4), "F": (3, 4, 7), "G": (1, 2, 3)}
te = {a: (o + 4 * m + p) / 6 for a, (o, m, p) in T.items()}; sd = {a: (p - o) / 6 for a, (o, m, p) in T.items()}
for a in ordem: print(f"{a}: te = ({T[a][0]} + 4*{T[a][1]} + {T[a][2]})/6 = {te[a]:.3f}  sigma = {sd[a]:.3f}")
soma = sum(te[a] for a in crit); var = sum(sd[a] ** 2 for a in crit)
print(f"Caminho critico (A,B,D,F,G): soma de te = {soma:.3f} dias, variancia = {var:.4f}, sigma = {var ** .5:.3f}")
print("\n== 3. Monte Carlo (triangular, 20.000 execucoes, semente 11) ==")
rnd = random.Random(11); res = []
for _ in range(20000):
    EFm = {}
    for a in ordem:
        o, m, p = T[a]; d = rnd.triangular(o, p, m)
        EFm[a] = max([EFm[x] for x in A[a][1]], default=0) + d
    res.append(max(EFm.values()))
res.sort(); n = len(res)
print(f"media = {statistics.mean(res):.2f} dias | P50 = {res[n//2]:.2f} | P80 = {res[int(n*.8)]:.2f} | P95 = {res[int(n*.95)]:.2f}")
print(f"Probabilidade de terminar em ate {fim} dias (o CPM com duracoes mais provaveis): {sum(1 for r in res if r <= fim)/n:.1%}")
print("Moral: somar as durancoes mais provaveis do caminho critico subestima o prazo, porque ha caminhos quase criticos e riscos nas duas pontas.".replace("durancoes","duracoes"))
