# -*- coding: utf-8 -*-
"""Ferramenta DIDÁTICA: aplica as perguntas da crase a frases simples com a lacuna ___.
Não é corretor: usa listas pequenas de palavras e só serve para treinar o raciocínio."""
import re
VERBOS_A={'ir','vou','vai','fui','foi','chegar','chegou','cheguei','chegamos','refiro-me','refere-se','assisti','assistiu','assistimos','obedeceu','obedeço','respondeu','respondi','dirigiu-se','dirigiu','entregou','voltou','volto','levou'}
FEM={'escola','questão','noite','mulher','casa','praia','reunião','diretoria','sala','biblioteca','prova','banca','cidade','secretaria','tarde','manhã','direita','esquerda','procura','medida','hora'}
MASC={'cidadão','pé','cavalo','lápis','colégio','tribunal','trabalho','estudo','edital'}
PRON={'ele','ela','você','nós','eles','elas','mim','ti','si','vossa','vossas'}
LUGAR_SEM_ARTIGO={'brasília','salvador','goiânia','roma','paris','lisboa','curitiba'}
LUGAR_COM_ARTIGO={'bahia','paraíba','itália','argentina','espanha'}
def analisa(frase):
    m=re.search(r'(\S+)\s+___\s+(\S+)',frase)
    if not m: return 'sem lacuna'
    ante,prox=m.group(1).lower().strip('.,;'),m.group(2).lower().strip('.,;')
    p=[]
    if prox in LUGAR_SEM_ARTIGO: return f'NÃO: nome de lugar sem artigo (volto de {prox.title()}), logo só a preposição'
    if prox in LUGAR_COM_ARTIGO: return f'SIM: nome de lugar com artigo (volto da {prox.title()}): a + a = à'
    if prox in PRON: return 'NÃO: pronome pessoal/tratamento não aceita artigo'
    if prox in MASC: return f'NÃO: palavra masculina ("{prox}" leva o, não a): sem artigo feminino, sem crase'
    if prox.endswith(('ar','er','ir')) and prox not in FEM: return 'NÃO: antes de verbo no infinitivo só há preposição'
    if prox in ('horas','hora') or re.fullmatch(r'\d+',prox): return 'SIM: hora determinada (às 8 horas)'
    if prox=='casa': return 'NÃO (cuidado): "casa" sozinha, no sentido de lar, não aceita artigo (voltou a casa); com adjunto há crase (voltou à casa de praia)'
    if prox in FEM:
        if ante not in VERBOS_A: return f'NÃO (a conferir): "{ante}" não está na lista de verbos que pedem a; sem preposição não há crase'
        return f'SIM: "{ante}" pede a e "{prox}" é feminina e aceita artigo: a + a = à (teste do masculino: ao + palavra masculina)'
    return 'NÃO SEI: palavra fora das listas (a ferramenta é didática)'
FRASES=['Vou ___ escola.','Refiro-me ___ questão do edital.','Chegou ___ pé.','Ela começou ___ falar.','Entregou o ofício ___ ele.','Fui ___ Brasília.','Fui ___ Bahia.','Vi ___ diretoria ontem.','A sessão começa ___ 8 horas.','Dirigiu-se ___ secretaria.','Voltou ___ casa.','Voltou ___ casa de praia.','Respondeu ___ cidadão.']
for f in FRASES: print(f'{f:40s} {analisa(f)}')
