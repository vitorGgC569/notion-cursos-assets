# L9. Riscos de um projeto de TI: matriz probabilidade x impacto, valor monetario esperado (VME) e reserva de contingencia
import random
R = [  # id, risco, probabilidade, impacto em R$ (negativo = ameaca, positivo = oportunidade), resposta
 ("R1", "Fornecedor atrasa a entrega de licencas", .30, -80_000, "mitigar: clausula de multa e segundo fornecedor"),
 ("R2", "Mudanca de requisitos pela alta gestao", .50, -60_000, "mitigar: controle integrado de mudancas"),
 ("R3", "Vulnerabilidade critica descoberta antes da implantacao", .20, -150_000, "transferir/mitigar: pentest e seguro cibernetico"),
 ("R4", "Equipe-chave sai do projeto", .15, -120_000, "mitigar: documentacao e dupla de conhecimento"),
 ("R5", "Reuso de componente de outro orgao reduz o custo", .25, 70_000, "explorar: priorizar a busca por componentes"),
 ("R6", "Greve de transporte atrasa a homologacao", .05, -30_000, "aceitar: sem acao, monitorar"),
]
print("== 1. Registro de riscos e matriz 3 x 3 (probabilidade x impacto) ==")
def faixa_p(p): return "alta" if p >= .4 else "media" if p >= .15 else "baixa"
def faixa_i(i): a = abs(i); return "alto" if a >= 100_000 else "medio" if a >= 50_000 else "baixo"
SC = {("alta","alto"):9,("alta","medio"):6,("alta","baixo"):3,("media","alto"):6,("media","medio"):4,("media","baixo"):2,("baixa","alto"):3,("baixa","medio"):2,("baixa","baixo"):1}
for rid, desc, p, i, resp in sorted(R, key=lambda r: -SC[(faixa_p(r[2]), faixa_i(r[3]))]):
    print(f"{rid} P={p:.2f} ({faixa_p(p)}) I={i:>9,} ({faixa_i(i)}) escore={SC[(faixa_p(p), faixa_i(i))]} | {desc} | {resp}")
print("\n== 2. Valor monetario esperado (VME = probabilidade x impacto) ==")
ame = sum(p * i for _, _, p, i, _ in R if i < 0); opo = sum(p * i for _, _, p, i, _ in R if i > 0)
for rid, desc, p, i, _ in R: print(f"{rid}: {p:.2f} x {i:>9,} = {p*i:>10,.0f}")
print(f"Soma das ameacas = {ame:,.0f} | soma das oportunidades = {opo:,.0f} | saldo = {ame+opo:,.0f}")
print("Reserva de contingencia (riscos identificados) = |soma das ameacas| =", f"{-ame:,.0f}", "| reserva gerencial cobre os riscos nao identificados")
print("\n== 3. Monte Carlo do custo dos riscos (30.000 execucoes, semente 3) ==")
rnd = random.Random(3); tot = []
for _ in range(30000): tot.append(sum(i for _, _, p, i, _ in R if rnd.random() < p))
tot.sort(); n = len(tot)
print(f"media = {sum(tot)/n:,.0f} | P50 = {tot[n//2]:,.0f} | P80 = {tot[int(.2*n)]:,.0f} | P90 = {tot[int(.1*n)]:,.0f}  (valores negativos = perda)")
print(f"Probabilidade de perda total maior que a reserva de {-ame:,.0f}: {sum(1 for x in tot if x < ame)/n:.1%}")
print("A reserva pelo VME cobre so a media; para um nivel de confianca de 80% ou 90% a reserva precisa ser maior.")
