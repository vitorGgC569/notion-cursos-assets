# -*- coding: utf-8 -*-
"""L8: validade de argumentos, verdade e mentira, e quebra-cabeças de relações (força bruta)."""
from itertools import product,permutations
from common import *
IMP=lambda p,q:(not p) or q
def valido(premissas,conclusao,n):
    return all(conclusao(*v) for v in product([True,False],repeat=n) if all(p(*v) for p in premissas))
print('--- 1. Formas de argumento (validade por tabela-verdade)')
print('Modus ponens   (p->q, p |- q)      :',valido([lambda p,q:IMP(p,q),lambda p,q:p],lambda p,q:q,2))
print('Modus tollens  (p->q, ~q |- ~p)    :',valido([lambda p,q:IMP(p,q),lambda p,q:not q],lambda p,q:not p,2))
print('Silogismo hipotético (p->q,q->r |- p->r):',valido([lambda p,q,r:IMP(p,q),lambda p,q,r:IMP(q,r)],lambda p,q,r:IMP(p,r),3))
print('Silogismo disjuntivo (p ou q, ~p |- q):',valido([lambda p,q:p or q,lambda p,q:not p],lambda p,q:q,2))
print('Falácia: afirmar o consequente (p->q, q |- p):',valido([lambda p,q:IMP(p,q),lambda p,q:q],lambda p,q:p,2))
print('Falácia: negar o antecedente (p->q, ~p |- ~q):',valido([lambda p,q:IMP(p,q),lambda p,q:not p],lambda p,q:not q,2))
print('\n--- 2. TRT-4 2022, questão 16 (viaja, feira, férias, dia útil)')
M=[m for m in product([True,False],repeat=4) if IMP(m[0],not m[1]) and IMP(m[2] and not m[3],m[0]) and m[1]]
# m = (viajou, foi à feira, em férias, dia útil)
necessarias('t4',16,{'A':lambda m:m[3],'B':lambda m:m[2],'C':lambda m:not m[2],'D':lambda m:not m[3],'E':lambda m:not m[0]},M)
print('\n--- 3. TRT-1 2014, questão 25 (jantar, ônibus, convite, chefe)')
M=[m for m in product([True,False],repeat=5) if IMP(m[0],m[1]) and IMP(m[0],m[2]) and IMP(m[1],m[3]) and m[1]]
# m = (jantou, ônibus 19h, convidou, chefe liberou, Júlia aceitou)  -- a variável "aceitou" é livre
necessarias('t1',25,{'A':lambda m:m[0],'B':lambda m:m[3],'C':lambda m:m[4],'D':lambda m:not m[0],'E':lambda m:not m[2]},M)
print('\n--- 4. TRT-1 2014, questão 29 (Manuel, Edileuza, João, Ricardo)')
XOR=lambda a,b:a!=b
M=[m for m in product([True,False],repeat=4) if IMP(m[0],not m[1]) and XOR(m[2],m[3]) and IMP(not m[3],m[1]) and m[2]]
# m = (Manuel engenheiro, Edileuza médica, João analista, Ricardo advogado)
necessarias('t1',29,{'A':lambda m:m[0] or m[3],'B':lambda m:(not m[0]) and (not m[1]),'C':lambda m:(not m[1]) and m[2],'D':lambda m:m[2] and m[0],'E':lambda m:(not m[0]) and (not m[3])},M)
print('\n--- 5. TRT-1 2014, questão 30 (caí, escorreguei, tropecei, deitei)')
M=[m for m in product([True,False],repeat=4) if XOR(m[0],m[1]) and (m[1] or m[2]) and not (m[0] or m[3]) and (m[2] or m[3]) and IMP(m[1],not m[3])]
necessarias('t1',30,{'A':lambda m:m[2] and m[1],'B':lambda m:m[1] and m[0],'C':lambda m:m[2] and m[3],'D':lambda m:(not m[1]) and m[2],'E':lambda m:m[0] and m[3]},M)
print('\n--- 6. TRT-2 2014, questão 20 (as cinco irmãs)')
M=[m for m in product([True,False],repeat=5) if IMP(m[0],m[1]) and IMP(not m[2],m[3]) and IMP(not m[4],not m[1]) and IMP(m[3],m[0]) and not m[0]]
# m = (Paula, Bruna, Renata, Laura, Flávia)
necessarias('t2a',20,{'A':lambda m:not m[1],'B':lambda m:not m[4],'C':lambda m:m[4],'D':lambda m:not m[2],'E':lambda m:m[2]},M)
print('\n--- 7. TRT-14 2022, questão 13 (Alex, Beto, Caio: honestos H ou mentirosos M)')
cons=[]
for a,b,c in product([True,False],repeat=3):   # True = honesto
    mentirosos=3-(a+b+c)
    if a==(not b) and b==(mentirosos==2): cons.append((a,b,c))
nome=lambda t:'('+', '.join('H' if x else 'M' for x in t)+')'
print('combinações coerentes com as duas falas:',[nome(t) for t in cons])
print('Um honesto repete o mesmo ano; só um mentiroso muda de resposta. Paula só concluiu depois da 2ª resposta, logo Caio é mentiroso:')
fim=[t for t in cons if not t[2]]; print('combinação final:',[nome(t) for t in fim])
confere('t14',13,letra_por_valor(nome(fim[0]),['(M, H, M)','(M, M, H)','(M, H, H)','(M, M, M)','(H, M, H)']))
print('\n--- 8. TCE-GO 2009, questão 20 (Corina mente de quarta a sexta)')
dias=['segunda','terça','quarta','quinta','sexta','sábado','domingo']; mente={2,3,4}
def p1(d): return (d-1)%7 in mente
def p2(d):
    prox=[k for k in range(1,8) if (d+k)%7 in mente][0]; return prox==3
oficial=[dias[d] for d in range(7) if (d not in mente and p1(d) and p2(d)) or (d in mente and not p1(d) and not p2(d))]
estrita=[dias[d] for d in range(7) if (d not in mente and p1(d) and p2(d)) or (d in mente and not (p1(d) and p2(d)))]
verdade=[dias[d] for d in range(7) if d not in mente and p1(d) and p2(d)]
print('dias de verdade que servem:',verdade)
print('leitura oficial (quem mente erra as duas partes):',oficial)
print('negação lógica estrita de "A e B" (basta uma parte falsa):',estrita)
confere('tg',20,letra_por_valor(oficial[0],['segunda','quarta','sexta','sábado','domingo']),'o gabarito só fecha com a leitura oficial')
print('\n--- 9. TCE-GO 2009, questão 24 (nomes, cidades e tarefas)')
nomes=['Alceste','Carmo','Germano','Irineu','Mustafá']; cid=['Anápolis','Catalão','Goiânia','Inhumas','Morrinhos']; tar=['arquivar','conferir','guardar','implementar','manutenção']
sol=[]
for pc in permutations(range(5)):
    for pt in permutations(range(5)):
        ok=all(len({nomes[i][0],cid[pc[i]][0],tar[pt[i]][0].upper()})==3 for i in range(5))
        ok=ok and all(cid[pc[i]]!='Goiânia' for i in range(5) if tar[pt[i]]=='conferir')
        ok=ok and tar[pt[1]] not in('guardar','manutenção') and cid[pc[1]] not in('Goiânia','Inhumas')
        ok=ok and cid[pc[3]]=='Morrinhos' and tar[pt[3]] not in('conferir','arquivar')
        ok=ok and cid[pc[0]]!='Catalão' and cid[pc[4]]!='Catalão' and tar[pt[4]] not in('conferir','implementar')
        if ok: sol.append((pc,pt))
print('soluções:',len(sol))
pc,pt=sol[0]
for i in range(5): print(f'  {nomes[i]}: {cid[pc[i]]}, {tar[pt[i]]}')
confere('tg',24,letra_por_valor((cid[pc[1]],cid[pc[2]]),[('Anápolis','Catalão'),('Anápolis','Morrinhos'),('Inhumas','Anápolis'),('Morrinhos','Catalão'),('Morrinhos','Inhumas')]))
print('\n--- 10. TRT-4 2022, questão 18 (almoço de Leonardo, Marcelo e Nelson)')
pessoas=['Leonardo','Marcelo','Nelson']; M=[]
for pr in permutations(['carne','torta','farofa']):
  for be in permutations(['suco','refrigerante','vinho']):
    for so in permutations(['bolo','pudim','frutas']):
        d={p:(pr[i],be[i],so[i]) for i,p in enumerate(pessoas)}
        if d['Leonardo'][2]=='frutas' and all(IMP(d[p][1]=='suco',d[p][0]=='carne') for p in pessoas) and d['Nelson'][0]=='farofa' and d['Nelson'][2]!='pudim' and d['Marcelo'][0]!='carne': M.append(d)
print('modelos possíveis:',len(M))
def com(d,k,v): return [p for p in pessoas if d[p][k]==v][0]
necessarias('t4',18,{'A':lambda d:d['Nelson'][1]=='vinho' and d['Nelson'][2]=='bolo','B':lambda d:d['Marcelo'][0]=='torta' and d['Marcelo'][1]=='refrigerante','C':lambda d:d['Leonardo'][0]=='carne' and d['Leonardo'][1]=='suco','D':lambda d:d[com(d,0,'torta')][1]=='vinho','E':lambda d:d[com(d,2,'bolo')][1]=='refrigerante'},M)
print('\n--- 11. TRT-23 2022, questão 11 (corretores: nascimento e férias)')
E=['Alagoas','Paraíba','Bahia']; M=[]
for nas in permutations(E):
  for fer in permutations(E):
    n=dict(zip(['André','Breno','Pedro'],nas)); f=dict(zip(['André','Breno','Pedro'],fer))
    if [p for p in n if n[p]==f[p]]==['André'] and n['Breno']!='Bahia' and f['Breno']!='Bahia' and f['Pedro']=='Alagoas': M.append((n,f))
print('modelos (destinos diferentes):',len(M),'->',M[0])
necessarias('t23',11,{'A':lambda m:m[0]['André']=='Paraíba' and m[1]['Pedro']=='Alagoas','B':lambda m:m[0]['Breno']=='Alagoas' and m[0]['André']=='Paraíba','C':lambda m:m[0]['Pedro']=='Bahia' and m[1]['Pedro']=='Alagoas','D':lambda m:m[0]['Breno']=='Alagoas' and m[1]['André']=='Bahia'},M)
print('\n--- 12. TRT-22 2022, questão 17 (cursos e idades)')
M=[]
for cur in permutations(['Medicina','Engenharia','Direito']):
  for idF in range(15,41):
    c=dict(zip(['Davi','Eduardo','Felipe'],cur)); idade={'Davi':18,'Eduardo':20,'Felipe':idF}
    if len(set(idade.values()))==3 and c['Davi']!='Medicina' and c['Eduardo']!='Engenharia' and all(idade[p]==22 for p in c if c[p]=='Direito'): M.append((c,idade))
print('modelos:',len(M),'->',M[0])
eng=lambda m:[p for p in m[0] if m[0][p]=='Engenharia'][0]
necessarias('t22',17,{'A':lambda m:eng(m)=='Eduardo' and m[1]['Eduardo']==20,'B':lambda m:eng(m)=='Eduardo' and m[1]['Eduardo']==18,'C':lambda m:eng(m)=='Felipe' and m[1]['Felipe']==20,'D':lambda m:eng(m)=='Davi' and m[1]['Davi']==22,'E':lambda m:eng(m)=='Davi' and m[1]['Davi']==18},M)
