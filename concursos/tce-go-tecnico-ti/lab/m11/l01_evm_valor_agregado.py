# L1. Valor agregado (EVM): PV, EV, AC, CPI, SPI, EAC, ETC, VAC e TCPI de um projeto de TI
# Projeto didatico (dados inventados para o estudo): 5 entregas, BAC = R$ 500.000, status no fim do mes 3
BAC = 500_000
entregas = [  # nome, orcamento, % planejado ate o mes 3, % realizado, custo real (R$)
    ("Levantamento de requisitos", 60_000, 1.00, 1.00, 66_000),
    ("Arquitetura e prototipo",    90_000, 1.00, 0.90, 99_000),
    ("Desenvolvimento modulo A",  150_000, 0.60, 0.40, 72_000),
    ("Desenvolvimento modulo B",  120_000, 0.25, 0.10, 18_000),
    ("Testes e implantacao",       80_000, 0.00, 0.00,      0),
]
assert sum(e[1] for e in entregas) == BAC
PV = sum(o * p for _, o, p, _, _ in entregas)
EV = sum(o * r for _, o, _, r, _ in entregas)
AC = sum(c for *_, c in entregas)
CV, SV = EV - AC, EV - PV
CPI, SPI = EV / AC, EV / PV
print("== 1. Valores basicos (fim do mes 3) ==")
print(f"BAC = {BAC:,.2f}  PV = {PV:,.2f}  EV = {EV:,.2f}  AC = {AC:,.2f}")
print(f"CV = EV - AC = {CV:,.2f}   SV = EV - PV = {SV:,.2f}")
print(f"CPI = EV/AC = {CPI:.4f}   SPI = EV/PV = {SPI:.4f}")
print("CPI < 1: gasta mais do que entrega. SPI < 1: atrasado em relacao ao cronograma." if CPI < 1 and SPI < 1 else "")
print("\n== 2. Previsoes (tres formas de EAC) ==")
eac_a = AC + (BAC - EV)            # desvio atipico: o resto custa o planejado
eac_b = BAC / CPI                  # desvio tipico: o desempenho de custo continua
eac_c = AC + (BAC - EV) / (CPI * SPI)   # custo e prazo influenciam
print(f"EAC (desvio atipico)  = AC + (BAC-EV)         = {eac_a:,.2f}")
print(f"EAC (desvio tipico)   = BAC/CPI                = {eac_b:,.2f}")
print(f"EAC (CPI e SPI)       = AC + (BAC-EV)/(CPI*SPI) = {eac_c:,.2f}")
etc = eac_b - AC; vac = BAC - eac_b
print(f"ETC = EAC - AC = {etc:,.2f}   VAC = BAC - EAC = {vac:,.2f}  (negativo = estouro)")
print("\n== 3. TCPI: que desempenho de custo e preciso daqui para frente? ==")
tcpi_bac = (BAC - EV) / (BAC - AC)
tcpi_eac = (BAC - EV) / (eac_b - AC)
print(f"TCPI para fechar no BAC = (BAC-EV)/(BAC-AC) = {tcpi_bac:.4f}")
print(f"TCPI para fechar no EAC = (BAC-EV)/(EAC-AC) = {tcpi_eac:.4f}")
print("\n== 4. Conferencia de identidades ==")
assert abs(eac_b - (AC + etc)) < 1e-6 and abs(CPI - EV / AC) < 1e-12
assert abs(tcpi_eac - CPI) < 1e-9       # fechar no EAC tipico (BAC/CPI) exige exatamente manter o CPI atual
print("TCPI(EAC tipico) = CPI atual:", f"{tcpi_eac:.4f} = {CPI:.4f}  -> OK (a previsao tipica supoe manter o desempenho atual)")
print("\n== 5. Por entrega ==")
for n, o, p, r, c in entregas:
    ev = o * r; pv = o * p
    print(f"{n:28s} EV={ev:>9,.0f} PV={pv:>9,.0f} AC={c:>8,.0f} CPI={(ev/c if c else float('nan')):.3f}")
