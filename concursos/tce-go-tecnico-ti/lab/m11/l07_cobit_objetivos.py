# L7. COBIT 2019: estrutura de 40 objetivos de governanca e gestao em 5 dominios, e priorizacao didatica por fatores de projeto
D = {
 "EDM": ("Avaliar, Dirigir e Monitorar (governanca)", ["Estrutura de governanca","Entrega de beneficios","Otimizacao de riscos","Otimizacao de recursos","Engajamento das partes interessadas"]),
 "APO": ("Alinhar, Planejar e Organizar", ["Estrutura de gestao de I&T","Estrategia","Arquitetura corporativa","Inovacao","Portfolio","Orcamento e custos","Recursos humanos","Relacionamentos","Acordos de servico","Fornecedores","Qualidade","Riscos","Seguranca","Dados"]),
 "BAI": ("Construir, Adquirir e Implementar", ["Programas","Definicao de requisitos","Identificacao e construcao de solucoes","Disponibilidade e capacidade","Mudanca organizacional","Mudancas de TI","Aceite e transicao de mudancas","Conhecimento","Ativos","Configuracao","Projetos"]),
 "DSS": ("Entregar, Servir e Suportar", ["Operacoes","Requisicoes de servico e incidentes","Problemas","Continuidade","Servicos de seguranca","Controles de processos de negocio"]),
 "MEA": ("Monitorar, Avaliar e Analisar", ["Desempenho e conformidade","Sistema de controle interno","Conformidade com requisitos externos","Asseguracao"]),
}
print("== 1. Estrutura do nucleo do COBIT 2019 ==")
tot = 0
for k, (nome, objs) in D.items():
    tot += len(objs); print(f"{k}: {nome} -> {len(objs)} objetivos ({k}01 a {k}{len(objs):02d})")
print(f"Total = {tot} objetivos; governanca = {len(D['EDM'][1])}, gestao = {tot-len(D['EDM'][1])}")
assert tot == 40 and len(D["EDM"][1]) == 5
print("\n== 2. Exemplos de codigos ==")
for cod in ["EDM03","APO12","BAI06","DSS02","DSS03","MEA01"]:
    k, n = cod[:3], int(cod[3:]); print(f"{cod} = {D[k][1][n-1]}")
print("\n== 3. Niveis de capacidade (0 a 5) ==")
for n, t in enumerate(["incompleto","executado","gerenciado","estabelecido","previsivel","otimizado"]): print(f"nivel {n}: {t}")
print("\n== 4. Priorizacao DIDATICA de objetivos por fatores de projeto (nao e o kit oficial da ISACA) ==")
# fator -> objetivos relevantes (peso 1 a 3); o contexto do tribunal define a importancia de cada fator (0 a 3)
fatores = {"Estrategia: transformacao digital": ({"APO02":3,"BAI01":2,"APO04":2,"EDM02":2}, 3),
           "Paisagem de ameacas: alta": ({"APO13":3,"DSS05":3,"APO12":2,"EDM03":2}, 3),
           "Requisitos de conformidade: alto (controle externo)": ({"MEA03":3,"MEA02":2,"EDM01":2,"APO12":1}, 3),
           "Papel da TI: sustentacao": ({"DSS01":2,"DSS02":3,"BAI04":2,"DSS04":2}, 2),
           "Modelo de fornecimento: terceirizado": ({"APO10":3,"APO09":3,"BAI01":1,"EDM04":1}, 2)}
pont = {}
for f, (m, imp) in fatores.items():
    for cod, w in m.items(): pont[cod] = pont.get(cod, 0) + w * imp
for cod, v in sorted(pont.items(), key=lambda x: (-x[1], x[0]))[:8]:
    k, n = cod[:3], int(cod[3:]); print(f"{cod} {D[k][1][n-1]:34s} pontuacao = {v}")
print("Fatores de projeto reais: sao 11 (estrategia, metas, perfil de risco, questoes de I&T, ameacas, conformidade, papel da TI, fornecimento, metodos, adocao de tecnologia, porte).")
