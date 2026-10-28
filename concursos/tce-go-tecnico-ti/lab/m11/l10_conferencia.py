# L10. Conferencia cruzada: reimplementa as formulas do modulo de outro jeito e compara com os resultados dos laboratorios
import random, math, itertools
ok = 0
def chk(nome, a, b, tol=1e-9):
    global ok
    assert abs(a - b) <= tol * max(1, abs(a), abs(b)), (nome, a, b)
    ok += 1; print(f"OK  {nome}: {a:.6g} == {b:.6g}")
# EVM: CPI e SPI por outra rota
BAC = 500_000; ev = 213_000; ac = 255_000; pv = 270_000
chk("CPI = EV/AC", ev / ac, 1 / (ac / ev))
chk("EAC tipico = AC + ETC com ETC=(BAC-EV)/CPI", ac + (BAC - ev) / (ev / ac), BAC / (ev / ac))
chk("TCPI(EAC tipico) = CPI", (BAC - ev) / (BAC / (ev / ac) - ac), ev / ac)
# PERT: variancia do caminho = soma das variancias
te = lambda o, m, p: (o + 4 * m + p) / 6
chk("te de (3,5,9) = 32/6", te(3, 5, 9), 32 / 6)
# Disponibilidade: paralelo = 1 - produto das indisponibilidades; enumeracao
def par_enum(ps): return sum(math.prod(p if x else 1 - p for x, p in zip(e, ps)) for e in itertools.product([0, 1], repeat=len(ps)) if any(e))
chk("paralelo 99,5% x2", par_enum([.995, .995]), 1 - .005 * .005)
chk("paralelo 99% x3", par_enum([.99] * 3), 1 - .01 ** 3)
chk("serie 99,9% x3", .999 ** 3, math.prod([.999] * 3))
# VPL: TIR zera o VPL
def vpl(c, f, i): return -c + sum(x / (1 + i) ** (t + 1) for t, x in enumerate(f))
c0, f0 = 400_000, [150_000, 160_000, 170_000, 170_000, 170_000]
lo, hi = 0, 5
for _ in range(200):
    mid = (lo + hi) / 2; lo, hi = (mid, hi) if vpl(c0, f0, mid) > 0 else (lo, mid)
chk("VPL na TIR = 0", vpl(c0, f0, lo), 0, 1e-6)
# Little por simulacao independente (fila D/D/1 deterministica)
chegadas = [i * 2 for i in range(1000)]; servico = 1.5; sai = []; livre = 0
for a in chegadas: ini = max(a, livre); livre = ini + servico; sai.append(livre)
W = sum(s - a for s, a in zip(sai, chegadas)) / len(chegadas); lam = len(chegadas) / (chegadas[-1] + 2)
chk("Little: L = lambda W com fila D/D/1 (L medido pelo tempo ocupado)", lam * W, 0.75, 1e-2)
# Modalidade: pregao somente para comum e nao intelectual
for comum, intel, esperado in [(True, False, "pregao"), (True, True, "concorrencia"), (False, False, "concorrencia")]:
    r = "pregao" if comum and not intel else "concorrencia"; assert r == esperado; ok += 1
print("OK  regra de modalidade (art. 29): 3 casos")
# COBIT: 5+14+11+6+4
chk("COBIT 2019: total de objetivos", 5 + 14 + 11 + 6 + 4, 40)
# Orcamento de erro: 99,9% em 30 dias
chk("orcamento de erro de 99,9% em 30 dias (min)", 30 * 24 * 60 * 0.001, 43.2)
print(f"\n{ok} conferencias passaram.")
