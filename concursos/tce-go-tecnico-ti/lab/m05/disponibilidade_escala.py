"""Disponibilidade, SLA composto, tempo de parada por ano e lei de Amdahl (escalabilidade)."""
ANO_MIN = 365 * 24 * 60
def parada(d): return (1 - d) * ANO_MIN
def fmt(m):
    return f'{m / 1440:.2f} dias' if m >= 1440 else f'{m / 60:.2f} horas' if m >= 60 else f'{m:.2f} minutos'
print('Disponibilidade -> parada por ano')
for d in (0.99, 0.999, 0.9999, 0.99999):
    print(f'  {d * 100:.3f}% -> {fmt(parada(d))}')
mtbf, mttr = 720, 2
d = mtbf / (mtbf + mttr)
print(f'\nMTBF = {mtbf} h, MTTR = {mttr} h -> disponibilidade = {d * 100:.3f}%')
print(f'reduzindo o MTTR para 0,5 h -> {mtbf / (mtbf + 0.5) * 100:.3f}%')
print('\nSLA composto')
a, b, c = 0.999, 0.999, 0.995
serie = a * b * c
print(f'  em serie (app, banco, rede): {serie * 100:.3f}%  -> parada {fmt(parada(serie))}/ano')
par = 1 - (1 - 0.999) ** 2
print(f'  dois servidores 99,9% em paralelo: {par * 100:.4f}%  -> parada {fmt(parada(par))}/ano')
print('\nLei de Amdahl: speedup = 1 / ((1 - p) + p / n), p = fracao paralelizavel')
for p in (0.5, 0.9, 0.95):
    print(f'  p = {p:.2f}: ' + ', '.join(f'n={n}: {1 / ((1 - p) + p / n):.2f}x' for n in (2, 4, 8, 64)) + f' | limite = {1 / (1 - p):.1f}x')
