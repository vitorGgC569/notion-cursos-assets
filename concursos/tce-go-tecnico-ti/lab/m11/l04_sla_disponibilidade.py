# L4. SLA e disponibilidade: nove noves, tempo parado por ano, componentes em serie e paralelo, orcamento de erro e credito de SLA
H_ANO = 8760
print("== 1. Disponibilidade -> tempo de parada por ano ==")
for a in [99.0, 99.5, 99.9, 99.95, 99.99, 99.999]:
    h = (1 - a / 100) * H_ANO; print(f"{a:>7}% -> {h:8.3f} h/ano = {h*60:9.1f} min/ano = {h*60/12:7.1f} min/mes")
print("\n== 2. Composicao: serie x paralelo ==")
def serie(*a):
    r = 1
    for x in a: r *= x / 100
    return r * 100
def paralelo(*a):
    r = 1
    for x in a: r *= 1 - x / 100
    return (1 - r) * 100
print(f"3 componentes de 99,9% em SERIE    = {serie(99.9,99.9,99.9):.4f}%")
print(f"2 componentes de 99,0% em PARALELO = {paralelo(99.0,99.0):.4f}%")
arq = serie(99.95, paralelo(99.5, 99.5), 99.9)
print(f"Arquitetura: balanceador 99,95% -> [2 servidores 99,5% em paralelo] -> banco 99,9% = {arq:.4f}%")
print(f"Parada esperada: {(1-arq/100)*H_ANO:.2f} h/ano")
print("\n== 3. Verificacao por enumeracao de estados (2 servidores 99,5%) ==")
from itertools import product
p = 0.995; tot = 0
for e in product([0, 1], repeat=2):
    pr = 1
    for x in e: pr *= p if x else 1 - p
    if any(e): tot += pr
print(f"P(pelo menos um funcionando) por enumeracao = {tot*100:.4f}%  (formula: {paralelo(99.5,99.5):.4f}%)")
print("\n== 4. Orcamento de erro de um SLO de 99,9% em 30 dias ==")
mes = 30 * 24 * 60; slo = 99.9; erro = mes * (1 - slo / 100)
print(f"Minutos no mes = {mes}; orcamento de erro = {erro:.2f} min")
for gasto in [10, 30, 43.2, 60]:
    print(f"  incidentes somaram {gasto:>5} min -> consumo {gasto/erro:6.1%} -> {'SLO violado' if gasto>erro else 'dentro do orcamento'}")
print("\n== 5. Credito de SLA (tabela contratual hipotetica) ==")
def credito(disp):
    if disp >= 99.9: return 0
    if disp >= 99.0: return 10
    if disp >= 95.0: return 25
    return 100
fat = 80_000
for disp in [99.95, 99.5, 97.0, 90.0]:
    print(f"  medido {disp:>6}% -> credito {credito(disp):>3}% = R$ {fat*credito(disp)/100:,.2f} de R$ {fat:,.2f}")
