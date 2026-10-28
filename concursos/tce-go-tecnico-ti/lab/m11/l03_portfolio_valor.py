# L3. Portfolio de TI: VPL, TIR, payback, ROI e selecao de projetos sob orcamento (forca bruta, 2^8 combinacoes)
from itertools import combinations, product
TAXA = 0.10
# nome: (custo inicial, fluxo anual dos anos 1 a 5, nota estrategica 0-10)
P = {
 "Modernizar sistema de processos": (400_000, [150_000, 160_000, 170_000, 170_000, 170_000], 9),
 "Painel de auditoria (BI)":        (250_000, [ 90_000, 100_000, 110_000, 110_000, 110_000], 8),
 "Migracao para nuvem":             (600_000, [180_000, 220_000, 240_000, 250_000, 260_000], 7),
 "Atualizar rede interna":          (300_000, [ 70_000,  80_000,  90_000,  90_000,  90_000], 6),
 "Portal da transparencia v2":      (350_000, [ 60_000,  90_000, 120_000, 140_000, 150_000], 8),
 "Servico de assinatura digital":   (120_000, [ 40_000,  45_000,  50_000,  50_000,  50_000], 7),
 "Treinamento em seguranca":        ( 80_000, [ 20_000,  30_000,  30_000,  30_000,  30_000], 5),
 "Intranet nova":                   (200_000, [ 30_000,  35_000,  40_000,  40_000,  40_000], 3),
}
def vpl(c, f, i=TAXA): return -c + sum(x / (1 + i) ** (t + 1) for t, x in enumerate(f))
def tir(c, f):
    if vpl(c, f, 0) < 0: return None  # a soma dos fluxos nao cobre o custo: TIR negativa
    lo, hi = 0.0, 5.0
    for _ in range(200):
        mid = (lo + hi) / 2
        (lo, hi) = (mid, hi) if vpl(c, f, mid) > 0 else (lo, mid)
    return lo
def payback(c, f):
    ac = -c
    for t, x in enumerate(f, 1):
        if ac + x >= 0: return t - 1 + (-ac) / x
        ac += x
    return None  # nao se paga no horizonte de 5 anos
print(f"== 1. Indicadores por projeto (taxa de desconto {TAXA:.0%}) ==")
print(f"{'projeto':34s} {'VPL':>10s} {'TIR':>7s} {'payback':>8s} {'ROI 5a':>7s}")
R = {}
for n, (c, f, nota) in P.items():
    v, t, pb = vpl(c, f), tir(c, f), payback(c, f); roi = (sum(f) - c) / c
    R[n] = (v, c, nota); print(f"{n:34s} {v:>10,.0f} {(f"{t:.1%}" if t is not None else "<0"):>7s} {(f"{pb:.2f}a" if pb else "nunca"):>8s} {roi:>6.1%}")
print("\n== 2. Selecao sob orcamento de R$ 1.000.000: maximizar o VPL total ==")
nomes = list(P); orc = 1_000_000; melhor = (-1e18, None)
for mask in product([0, 1], repeat=len(nomes)):
    esc = [n for n, m in zip(nomes, mask) if m]
    if sum(R[n][1] for n in esc) <= orc:
        s = sum(R[n][0] for n in esc)
        if s > melhor[0]: melhor = (s, esc)
print("Melhor combinacao por VPL:", "; ".join(melhor[1])); print(f"VPL total = {melhor[0]:,.0f} | custo = {sum(R[n][1] for n in melhor[1]):,.0f}")
print("\n== 3. Ranking por nota estrategica x indice de lucratividade (VPL/custo) ==")
rk = sorted(P, key=lambda n: -(R[n][2] * (R[n][0] / R[n][1])))
for i, n in enumerate(rk, 1): print(f"{i}. {n:34s} nota={R[n][2]} IL={R[n][0]/R[n][1]:.3f} escore={R[n][2]*R[n][0]/R[n][1]:.3f}")
print("Observacao: o ranking pelo escore nao e o mesmo da selecao por VPL; governanca de portfolio exige criterios explicitos e aprovados.")
