#!/usr/bin/env python3
"""Capacidade util de RAID e downtime por SLA (biblioteca padrao)."""
def raid(n, tam):
    t = {
     "RAID 0":  (n * tam, "0 discos (qualquer falha perde tudo)", n >= 2),
     "RAID 1":  (tam, f"{n - 1} disco(s) (espelhos)", n >= 2),
     "RAID 5":  ((n - 1) * tam, "1 disco", n >= 3),
     "RAID 6":  ((n - 2) * tam, "2 discos", n >= 4),
     "RAID 10": ((n // 2) * tam, "1 por par (até n/2, se forem de pares diferentes)", n >= 4 and n % 2 == 0),
    }
    return t
N, TAM = 4, 2  # 4 discos de 2 TB
print(f"== {N} discos de {TAM} TB ==")
print(f"{'Nível':9}{'Útil (TB)':11}{'Tolera falha de':55}")
for nome, (u, tol, ok) in raid(N, TAM).items():
    print(f"{nome:9}{u:<11}{tol if ok else 'não se aplica com ' + str(N) + ' discos':55}")
print()
print("== Disponibilidade (SLA) e tempo fora do ar por ano ==")
print(f"{'SLA':9}{'Por ano':>14}{'Por mês (30d)':>16}")
for sla in (99.0, 99.9, 99.99, 99.999):
    fora = (1 - sla / 100)
    ano = fora * 365 * 24 * 60
    mes = fora * 30 * 24 * 60
    def fmt(m):
        if m >= 60: return f"{m/60:.1f} h"
        if m >= 1: return f"{m:.1f} min"
        return f"{m*60:.0f} s"
    print(f"{sla:<9}{fmt(ano):>14}{fmt(mes):>16}")
print()
print("Dois componentes em série (A e B precisam funcionar): 0,999 x 0,999 =", round(0.999*0.999*100, 4), "%")
print("Dois componentes em paralelo (basta um): 1 - (0,001 x 0,001) =", round((1-0.001*0.001)*100, 4), "%")
