# RAG em miniatura, só com biblioteca padrão: TF-IDF + similaridade do cosseno recuperam os trechos
# e o script monta o prompt. O LLM NÃO é chamado aqui: o objetivo é ver a etapa de recuperação.
import math,re,unicodedata
DOCS={
'lgpd-art20':'O titular dos dados tem direito a solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses.',
'lgpd-art12':'Os dados anonimizados não serão considerados dados pessoais, salvo quando o processo de anonimização puder ser revertido com esforços razoáveis.',
'ebia':'A Estratégia Brasileira de Inteligência Artificial adota princípios da OCDE como transparência, explicabilidade, robustez, segurança e responsabilização.',
'mlops':'MLOps automatiza o ciclo de vida de modelos de aprendizado de máquina, com versionamento de dados e modelos, implantação e monitoramento de drift.',
'spark':'O Apache Spark processa dados de forma distribuída em memória e é mais rápido que o MapReduce em algoritmos iterativos.',
'kfold':'Na validação cruzada k-fold os dados são divididos em k partes; em cada rodada uma é usada para teste e as demais para treino.',
}
STOP=set('o a os as de do da dos das e em um uma que com por para ao na no nas nos se ou como mais salvo quando'.split())
def tok(s):
    s=unicodedata.normalize('NFD',s.lower()); s=''.join(c for c in s if unicodedata.category(c)!='Mn')
    return [w[:6] for w in re.findall(r'[a-z0-9]+',s) if w not in STOP and len(w)>2]   # radical grosseiro: 6 primeiras letras
T={k:tok(v) for k,v in DOCS.items()}; N=len(T)
df={}
for ws in T.values():
    for w in set(ws): df[w]=df.get(w,0)+1
idf=lambda w:math.log((1+N)/(1+df.get(w,0)))+1
def vet(ws):
    v={}
    for w in ws: v[w]=v.get(w,0)+1
    return {w:c*idf(w) for w,c in v.items()}
def cos(a,b):
    num=sum(a[w]*b.get(w,0) for w in a); na=math.sqrt(sum(x*x for x in a.values())); nb=math.sqrt(sum(x*x for x in b.values()))
    return num/(na*nb) if na and nb else 0
V={k:vet(ws) for k,ws in T.items()}
def buscar(q,k=2):
    qv=vet(tok(q)); r=sorted(((cos(qv,V[d]),d) for d in V),reverse=True)[:k]
    return [x for x in r if x[0]>0]   # sem nenhuma palavra em comum, não há trecho

for q in ['O cliente pode pedir revisão de uma decisão automatizada?','Quais princípios a estratégia brasileira de IA adota?','Como medir se o modelo generaliza?']:
    print('PERGUNTA:',q)
    r=buscar(q)
    for s,d in r: print(f'   {s:.3f}  {d}')
    if not r: print('   nenhum trecho com palavra em comum (busca lexical falhou; embeddings resolveriam por sentido)')
    print()
q='Dado anonimizado ainda é dado pessoal?'; top=buscar(q,2)
print('PROMPT MONTADO PARA O LLM (consulta:',q,')\n---')
print('Responda apenas com base nos trechos abaixo e cite a fonte. Se não houver resposta, diga que não sabe.')
for s,d in top: print(f'[{d}] {DOCS[d]}')
print('Pergunta:',q)
