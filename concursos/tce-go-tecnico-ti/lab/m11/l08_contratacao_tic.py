# L8. Contratacao de TIC (Lei 14.133/2021): estimativa de preco, escolha de modalidade e criterio, e julgamento por tecnica e preco
import statistics
print("== 1. Estimativa de valor (art. 23): parametros combinados ==")
cot = {"painel de precos (mediana)": 118_000, "contratacao similar (1 ano)": 124_500, "midia especializada": 131_000, "fornecedor A": 135_000, "fornecedor B": 128_000, "fornecedor C": 142_000}
v = list(cot.values())
for k, x in cot.items(): print(f"{k:32s} R$ {x:>10,.2f}")
print(f"menor = {min(v):,.2f} | mediana = {statistics.median(v):,.2f} | media = {statistics.mean(v):,.2f} | maior = {max(v):,.2f}")
print("O art. 23 manda definir o valor pelo MELHOR preco aferido; a metodologia deve ser justificada no processo, e as cotacoes diretas (minimo de 3 fornecedores, com justificativa) tem validade de ate 6 meses.")
print("\n== 2. Modalidade e criterio de julgamento (regras dos arts. 6, 28, 29, 32, 33 e 36) ==")
def modalidade(comum, intelectual=False, inovacao_sem_especificacao=False, especial_tic=False):
    if inovacao_sem_especificacao: return "dialogo competitivo (art. 32), se justificado", "definido ao fim do dialogo"
    if comum and not intelectual: return "pregao (art. 6, XLI e art. 29)", "menor preco ou maior desconto"
    if especial_tic: return "concorrencia (art. 6, XXXVIII)", "tecnica e preco (art. 36, par. 1, III) quando o ETP demonstrar a relevancia da qualidade tecnica"
    return "concorrencia (art. 6, XXXVIII)", "menor preco, melhor tecnica, tecnica e preco, maior retorno economico ou maior desconto"
casos = [("Notebooks e licencas de uso padronizadas", dict(comum=True)), ("Sustentacao de sistemas sob medida (servico especial de TIC)", dict(comum=False, especial_tic=True)),
         ("Solucao de IA ainda sem especificacao fechada, com inovacao tecnologica", dict(comum=False, inovacao_sem_especificacao=True)), ("Consultoria predominantemente intelectual", dict(comum=True, intelectual=True))]
for n, kw in casos: m, cr = modalidade(**kw); print(f"- {n}\n    modalidade: {m}\n    criterio: {cr}")
print("\n== 3. Tecnica e preco (art. 36, par. 2: ate 70% de peso para a proposta tecnica) ==")
prop = {"Empresa X": (90, 1_500_000), "Empresa Y": (80, 1_200_000), "Empresa Z": (70, 1_000_000)}
menor = min(p for _, p in prop.values())
for wt in [0.70, 0.50]:
    print(f"peso tecnico = {wt:.0%}, peso preco = {1-wt:.0%}")
    res = {}
    for n, (nt, p) in prop.items(): np_ = 100 * menor / p; res[n] = wt * nt + (1 - wt) * np_; print(f"  {n}: nota tecnica {nt}, nota de preco {np_:.2f} -> nota final {res[n]:.2f}")
    print("  vencedora:", max(res, key=res.get))
print("\n== 4. Fases da licitacao (art. 17) e documentos da fase preparatoria (art. 18) ==")
fases = ["preparatoria", "divulgacao do edital", "apresentacao de propostas e lances", "julgamento", "habilitacao", "recursal", "homologacao"]
for i, f in enumerate(fases, 1): print(f"{i}. {f}")
print("Fase preparatoria: ETP -> termo de referencia -> orcamento estimado -> edital e minuta de contrato -> analise de riscos (art. 18).")
print("Fases da IN SGD/ME 94/2022 (SISP, Executivo federal): planejamento da contratacao, selecao do fornecedor e gestao do contrato, com gerenciamento de riscos em paralelo.")
