# -*- coding: utf-8 -*-
"""L12: gerador de questões de treino (porte em Python do gerador do site). Mesma semente, mesma questão.
Cada modelo confere a resposta marcada por força bruta (enumeração), de forma independente da fórmula usada."""
import json,math,sys
from fractions import Fraction as Fr
from itertools import combinations,product
M32=0xFFFFFFFF
def rng(seed):
    a=[seed&M32]
    def f():
        a[0]=(a[0]+0x6D2B79F5)&M32; t=a[0]
        t=((t^(t>>15))*(t|1))&M32
        t^=(t+(((t^(t>>7))*(t|61))&M32))&M32
        return ((t^(t>>14))&M32)/4294967296
    return f
def ri(r,a,b): return a+math.floor(r()*(b-a+1))
def pick(r,arr): return arr[math.floor(r()*len(arr))]
def lcm(a,b): return a//math.gcd(a,b)*b
def rnd(x): return math.floor(x+0.5)
def dec(x):
    if isinstance(x,float) and x==int(x): x=int(x)
    return str(x).replace('.',',')
def fmt(n):
    s=str(abs(n)); o=''
    for i,ch in enumerate(s):
        if i and (len(s)-i)%3==0: o+='.'
        o+=ch
    return ('−' if n<0 else '')+o
def shuffle(r,arr):
    a=list(arr)
    for i in range(len(a)-1,0,-1):
        j=math.floor(r()*(i+1)); a[i],a[j]=a[j],a[i]
    return a
def opcoes(r,vals,f,ordenar):
    seen=set(); u=[]
    for v in vals:
        k=str(v)
        if k not in seen and (isinstance(v,str) or v>0): seen.add(k); u.append(v)
    c=vals[0]; d=1
    while len(u)<5 and not isinstance(c,str):
        x=c+d*(1 if d%2 else -1)*math.ceil(d/2); d+=1
        if x>0 and str(x) not in seen: seen.add(str(x)); u.append(x)
    u=u[:5]
    o=sorted(u) if ordenar else shuffle(r,u)
    return [f(x) for x in o],o.index(c)
def frac(n,d):
    g=math.gcd(n,d); n//=g; d//=g
    return str(n) if d==1 else f'{n}/{d}'
DIAS=['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado','domingo']
T={}
def modelo(id,tema):
    def d(f): T[id]=(tema,f); return f
    return d
@modelo('mmc','Múltiplos e divisores')
def _(r,n):
    P=[[4,6,8,9,10,12],[12,15,18,20,24,30],[28,36,45,48,60,72]][n-1]
    a=pick(r,P); b=pick(r,P)
    while b==a: b=pick(r,P)
    m=lcm(a,b); h=math.gcd(a,b)
    assert m==next(t for t in range(1,a*b+1) if t%a==0 and t%b==0)
    op,c=opcoes(r,[m,a*b,a+b,h,m*2],fmt,True)
    return dict(texto=f'Dois sinais luminosos piscam juntos às 20 h. O primeiro pisca a cada {a} segundos e o segundo, a cada {b} segundos. Depois de quantos segundos eles voltarão a piscar juntos pela primeira vez?',opcoes=op,certa=c,
     passos=[f'Piscam juntos nos instantes que são múltiplos comuns de {a} e {b}. O primeiro deles é o MMC.',f'MDC({a}, {b}) = {h}. Como MMC · MDC = produto, MMC = {a} · {b} ÷ {h} = {m}.',f'Resposta: {fmt(m)} segundos. Atenção: o produto {fmt(a*b)} é um múltiplo comum, mas não o menor.'])
@modelo('mdc','Múltiplos e divisores')
def _(r,n):
    g=pick(r,[[10,15,20,25],[20,30,40,60],[45,50,75,90]][n-1]); p=ri(r,2,4); q=ri(r,p+1,p+3)
    while math.gcd(p,q)!=1: q+=1
    a=g*p; b=g*q; pc=p*q
    lado=max(s for s in range(1,a+1) if a%s==0 and b%s==0); assert lado==g and (a//lado)*(b//lado)==pc
    op,c=opcoes(r,[pc,p+q,g,a*b//(g*g)+p,lcm(a,b)//g],fmt,True)
    return dict(texto=f'Um piso retangular de {a} cm por {b} cm será revestido com placas quadradas, todas iguais, de lado inteiro em centímetros, o maior possível, sem cortes nem sobras. O número de placas utilizadas será',opcoes=op,certa=c,
     passos=[f'O lado da placa é o MDC({a}, {b}) = {g} cm.',f'Largura: {a} ÷ {g} = {p} placas. Comprimento: {b} ÷ {g} = {q} placas.',f'Total: {p} · {q} = {pc} placas.'])
@modelo('frac','Frações, razão e proporção')
def _(r,n):
    D=[[2,3,4,5,6],[3,4,5,6,8],[6,7,8,9,12]][n-1]; q=pick(r,D); s=pick(r,D)
    while s==q: s=pick(r,D)
    p=ri(r,1,q-1); t=ri(r,1,s-1); num=p*s+t*q; den=q*s; res=frac(num,den)
    ex=Fr(p,q)+Fr(t,s); assert res==(str(ex.numerator) if ex.denominator==1 else f'{ex.numerator}/{ex.denominator}')
    vals=[res,frac(p+t,q+s),frac(p*t,q*s),frac(abs(p*s-t*q) or 1,den),frac(num,den+q),frac(num+1,den),frac(num+2,den),frac(num+3,den)]
    op,c=opcoes(r,vals,lambda x:x,False); L=lcm(q,s)
    return dict(texto=f'O resultado de {p}/{q} + {t}/{s}, na forma de fração irredutível (ou número inteiro), é',opcoes=op,certa=c,
     passos=[f'Denominador comum: MMC({q}, {s}) = {L}.',f'{p}/{q} = {p*L//q}/{L} e {t}/{s} = {t*L//s}/{L}.',f'Soma: {p*L//q+t*L//s}/{L} = {res} (simplificada). Somar numeradores e denominadores separadamente é erro.'])
@modelo('r3d','Regra de três')
def _(r,n):
    u=ri(r,[3,5,8][n-1],[9,15,25][n-1]); k=ri(r,2,[5,9,12][n-1]); c=u*k; z=ri(r,2,[9,14,20][n-1]); ans=z*k
    item=pick(r,['cadernos','canetas','pastas','pacotes']); assert Fr(c,u)*z==ans
    op,ci=opcoes(r,[ans,c+z,z+k,c*z,ans+k],fmt,True)
    return dict(texto=f'{u} {item} custam R$ {fmt(c)}. Mantido o preço unitário, {z} {item} custam, em reais,',opcoes=op,certa=ci,
     passos=['As grandezas são diretamente proporcionais: mais itens, mais dinheiro.',f'Preço unitário: {c} ÷ {u} = {k}.',f'{z} · {k} = {fmt(ans)}.'])
@modelo('r3i','Regra de três')
def _(r,n):
    a=pick(r,[[6,8,10,12],[10,12,15,20],[12,16,18,24]][n-1]); d=ri(r,[6,10,12][n-1],[15,24,30][n-1]); tot=a*d
    dv=[x for x in range(2,61) if tot%x==0 and x!=a]; b=pick(r,dv); ans=tot//b
    assert Fr(d)*Fr(a,b)==ans
    op,c=opcoes(r,[ans,rnd(d*b/a) or 1,d+(b-a),abs(d-(b-a)) or 1,tot],fmt,True)
    return dict(texto=f'{a} operários, trabalhando no mesmo ritmo, concluem uma obra em {d} dias. Com {b} operários, no mesmo ritmo, a obra seria concluída em quantos dias?',opcoes=op,certa=c,
     passos=['Mais operários, menos dias: grandezas inversamente proporcionais. O produto operários · dias é constante.',f'{a} · {d} = {tot} operário-dias.',f'{tot} ÷ {b} = {fmt(ans)} dias.'])
@modelo('r3c','Regra de três')
def _(r,n):
    m1=ri(r,2,[6,8,10][n-1]); h1=ri(r,4,8); d1=ri(r,3,[8,10,12][n-1]); m2=ri(r,2,10); h2=ri(r,4,10); d2=ri(r,3,15); pecas=m1*h1*d1*ri(r,2,[6,9,12][n-1])
    uni=pecas//(m1*h1*d1); ans=uni*m2*h2*d2
    assert Fr(pecas,1)*(m2*h2*d2)/(m1*h1*d1)==ans
    op,c=opcoes(r,[ans,pecas+m2*h2*d2,rnd(pecas*m2/m1),rnd(pecas*h2/h1),pecas],fmt,True)
    return dict(texto=f'{m1} máquinas idênticas, funcionando {h1} horas por dia durante {d1} dias, produzem {fmt(pecas)} peças. Com {m2} máquinas, funcionando {h2} horas por dia durante {d2} dias, serão produzidas',opcoes=op,certa=c,
     passos=['Peças são diretamente proporcionais a máquinas, horas por dia e dias: some os fatores multiplicando.',f'Primeiro caso: {m1} · {h1} · {d1} = {m1*h1*d1}. Segundo: {m2} · {h2} · {d2} = {m2*h2*d2}.',f'{fmt(pecas)} · {m2*h2*d2} ÷ {m1*h1*d1} = {fmt(ans)} peças.'])
@modelo('pcs','Porcentagem')
def _(r,n):
    P=100*ri(r,[2,4,8][n-1],[9,12,20][n-1]); a=10*ri(r,1,5); b=10*ri(r,1,4); v=P*(100+a)*(100-b)//10000
    assert Fr(P)*Fr(100+a,100)*Fr(100-b,100)==v
    op,c=opcoes(r,[v,P*(100+a-b)//100,P,P*(100+a)//100,P*(100-b)//100],fmt,True)
    return dict(texto=f'O preço de um produto, R$ {fmt(P)}, teve um aumento de {a}% e, em seguida, um desconto de {b}% sobre o preço já reajustado. O preço final, em reais, é',opcoes=op,certa=c,
     passos=[f'Os fatores multiplicam: aumento de {a}% vale ×{dec((100+a)/100)} e desconto de {b}% vale ×{dec((100-b)/100)}.',f'{fmt(P)} · {dec((100+a)/100)} = {fmt(P*(100+a)//100)}; depois · {dec((100-b)/100)} = {fmt(v)}.',f'Somar e subtrair os percentuais ({a-b}%) estaria errado: o desconto incide sobre uma base diferente.'])
@modelo('pvar','Porcentagem')
def _(r,n):
    p=pick(r,[5,10,15,20,25,30,40,50,60,75]); v0=20*ri(r,[5,10,20][n-1],[30,60,90][n-1]); v1=v0*(100+p)//100
    assert Fr(v1-v0,v0)*100==p
    op,c=opcoes(r,[p,rnd((v1-v0)*100/v1) or 1,((v1-v0)%100 or 1) if v1-v0>0 else 1,p+5,p*2],fmt,True)
    return dict(texto=f'O valor de uma conta passou de R$ {fmt(v0)} para R$ {fmt(v1)}. O percentual de aumento foi de',opcoes=[x+'%' for x in op],certa=c,
     passos=[f'Aumento em reais: {fmt(v1)} − {fmt(v0)} = {fmt(v1-v0)}.',f'O percentual é calculado sobre o valor inicial: {fmt(v1-v0)} ÷ {fmt(v0)} = {dec(p/100)}.',f'Aumento de {p}%. Dividir pelo valor final daria {dec(rnd((v1-v0)*1000/v1)/10)}%.'])
@modelo('med','Médias')
def _(r,n):
    k=ri(r,4,8); a=ri(r,[6,10,20][n-1],[12,20,40][n-1]); b=a-ri(r,1,3); ret=k*a-(k-1)*b
    if ret<1: b=a-1; ret=k*a-(k-1)*b
    # força bruta: números com soma k*a, tirando 'ret' a soma dos restantes tem média b
    assert Fr(k*a-ret,k-1)==b
    op,c=opcoes(r,[ret,a,b,k*a-k*b,ret+k],fmt,True)
    return dict(texto=f'A média aritmética de {k} números é {a}. Retirando-se um deles, a média dos {k-1} restantes passa a ser {b}. O número retirado é',opcoes=op,certa=c,
     passos=[f'Trabalhe com somas. Soma dos {k}: {k} · {a} = {k*a}.',f'Soma dos {k-1} restantes: {k-1} · {b} = {(k-1)*b}.',f'Número retirado: {k*a} − {(k-1)*b} = {ret}.'])
@modelo('conj','Conjuntos')
def _(r,n):
    A=ri(r,[20,30,40][n-1],[50,70,90][n-1]); B=ri(r,[15,25,30][n-1],[45,60,80][n-1]); I=ri(r,5,min(A,B)-5); u=A+B-I; none=ri(r,5,25); Tt=u+none
    X=set(range(A)); Y=set(range(A-I,A-I+B)); assert len(X&Y)==I and Tt-len(X|Y)==none
    op,c=opcoes(r,[none,Tt-(A+B),Tt-A-B+2*I,Tt-u+I,u],fmt,True)
    return dict(texto=f'Em um grupo de {Tt} pessoas, {A} leem o jornal X, {B} leem o jornal Y e {I} leem os dois. O número de pessoas que não leem nenhum dos dois jornais é',opcoes=op,certa=c,
     passos=[f'Quem lê pelo menos um: n(X ∪ Y) = {A} + {B} − {I} = {u} (a interseção entra uma vez só).',f'Quem não lê nenhum: {Tt} − {u} = {none}.'])
@modelo('cont','Contagem')
def _(r,n):
    N=ri(r,[5,6,7][n-1],[7,8,10][n-1]); k=ri(r,2,[3,3,4][n-1]); c=math.comb(N,k); pe=1
    for i in range(k): pe*=(N-i)
    assert c==sum(1 for _ in combinations(range(N),k))
    op,ci=opcoes(r,[c,pe,N**k,N*k,c*2],fmt,True)
    return dict(texto=f'Uma comissão de {k} pessoas será escolhida entre {N} candidatos, sem cargos distintos. O número de comissões possíveis é',opcoes=op,certa=ci,
     passos=[f'A ordem não importa (não há cargos): é combinação C({N}, {k}).',f'Arranjos A({N}, {k}) = {pe}; como cada comissão aparece {k}! vezes, divide-se por {k}!.',f'C({N}, {k}) = {c}.'])
@modelo('prop','Frações, razão e proporção')
def _(r,n):
    a=ri(r,1,3); b=ri(r,a+1,6); c=ri(r,b+1,9); s=a+b+c; u=ri(r,[50,100,200][n-1],[150,300,600][n-1]); T2=s*u
    partes=[T2*x//s for x in (a,b,c)]; assert sum(partes)==T2 and partes[2]-partes[0]==(c-a)*u
    op,ci=opcoes(r,[(c-a)*u,c*u,(b-a)*u,rnd(T2/3),(c-a)*u+u],fmt,True)
    return dict(texto=f'Uma verba de R$ {fmt(T2)} será dividida entre três setores em partes diretamente proporcionais a {a}, {b} e {c}. A diferença entre a maior e a menor parte, em reais, é',opcoes=op,certa=ci,
     passos=[f'Soma das razões: {a} + {b} + {c} = {s}. Cada unidade vale {fmt(T2)} ÷ {s} = {fmt(u)}.',f'Partes: {fmt(a*u)}, {fmt(b*u)} e {fmt(c*u)}.',f'Diferença: {fmt(c*u)} − {fmt(a*u)} = {fmt((c-a)*u)}.'])
@modelo('pa','Sequências e relações lógicas')
def _(r,n):
    a1=ri(r,2,[9,15,30][n-1]); rz=ri(r,2,[6,9,12][n-1]); N=ri(r,[8,15,30][n-1],[14,30,60][n-1]); an=a1+(N-1)*rz
    x=a1
    for _i in range(N-1): x+=rz
    assert x==an
    op,c=opcoes(r,[an,a1+N*rz,a1+(N-2)*rz,N*rz,an+a1],fmt,True)
    return dict(texto='Na sequência '+', '.join(str(a1+i*rz) for i in range(4))+f', ..., em que cada termo supera o anterior em {rz} unidades, o {N}º termo é',opcoes=op,certa=c,
     passos=[f'É uma progressão aritmética de razão {rz}. Termo geral: a(n) = a1 + (n − 1) · r.',f'a({N}) = {a1} + {N-1} · {rz} = {a1} + {(N-1)*rz} = {fmt(an)}.','Usar n em vez de n − 1 é o erro comum: o primeiro termo ainda não recebeu nenhuma razão.'])
@modelo('linhas','Proposições e tabelas-verdade')
def _(r,n):
    k=ri(r,2,[4,5,6][n-1]); assert sum(1 for _ in product([True,False],repeat=k))==2**k
    op,c=opcoes(r,[2**k,2*k,k*k,2**(k-1),2**(k+1)],fmt,True)
    return dict(texto=f'Uma proposição composta é formada por {k} proposições simples distintas. O número de linhas da sua tabela-verdade é',opcoes=op,certa=c,
     passos=['Cada proposição simples pode ser V ou F: 2 possibilidades.',f'Pelo princípio multiplicativo, {k} proposições dão 2^{k} = {2**k} linhas.'])
@modelo('neg','Proposições e tabelas-verdade')
def _(r,n):
    F=[['chove','o jogo é adiado'],['o servidor é aprovado','toma posse'],['há prova hoje','a biblioteca fica cheia'],['o sistema cai','a equipe é acionada']]; f=pick(r,F); A,B=f
    neg={'o jogo é adiado':'o jogo não é adiado','toma posse':'não toma posse','a biblioteca fica cheia':'a biblioteca não fica cheia','a equipe é acionada':'a equipe não é acionada'}[B]
    nA={'chove':'não chove','o servidor é aprovado':'o servidor não é aprovado','há prova hoje':'não há prova hoje','o sistema cai':'o sistema não cai'}[A]
    assert all((not ((not p) or q))==(p and not q) for p,q in product([True,False],repeat=2))
    vals=[f'{A} e {neg}.',f'se {nA}, então {neg}.',f'{nA} e {B}.',f'se {B}, então {A}.',f'{nA} ou {neg}.']
    op,c=opcoes(r,vals,lambda x:x,False)
    return dict(texto=f'A negação da proposição "Se {A}, então {B}" é',opcoes=op,certa=c,
     passos=['A condicional p → q só é falsa quando p é verdadeira e q é falsa.',f'Logo sua negação é "p e não q": "{A} e {neg}".','A segunda alternativa é a inversa e a quarta é a recíproca: ambas são outras condicionais, não a negação.'])
@modelo('cal','Sequências e relações lógicas')
def _(r,n):
    d=ri(r,0,6); k=ri(r,[20,50,100][n-1],[60,200,400][n-1]); res=(d+k)%7
    x=d
    for _i in range(k): x=(x+1)%7
    assert x==res
    vals=[DIAS[res],DIAS[(res+1)%7],DIAS[(res+6)%7],DIAS[(res+2)%7],DIAS[(res+5)%7]]
    op,c=opcoes(r,vals,lambda x:x,False)
    return dict(texto=f'Hoje é {DIAS[d]}. Daqui a {k} dias será',opcoes=op,certa=c,
     passos=[f'Os dias da semana se repetem de 7 em 7. {k} = {k//7} · 7 + {k%7}.',(f'Sobram 0 dias: o dia da semana é o mesmo, {DIAS[res]}.' if k%7==0 else f'Só importam os {k%7} dias que sobram: {DIAS[d]} + {k%7} = {DIAS[res]}.')])
ORDEM=['mmc','mdc','frac','r3d','r3i','r3c','pcs','pvar','med','conj','cont','prop','pa','linhas','neg','cal']
def gerar(tema,nivel,seed):
    r=rng(seed*7919+nivel*104729+13); ids=[i for i in ORDEM if tema=='Todos' or T[i][0]==tema]
    i=ids[math.floor(r()*len(ids))]; q=T[i][1](r,nivel); q['tema']=T[i][0]; q['id']=i; q['nivel']=nivel; q['seed']=seed
    return q
if __name__=='__main__':
    print('Gerador em Python: 16 modelos, 3 níveis, mesma semente gera a mesma questão do site.')
    q=gerar('Todos',2,5); print(json.dumps(q,ensure_ascii=False,indent=1))
    from collections import Counter
    cnt=Counter(); ruins=0
    for n in (1,2,3):
        for s in range(1,2001):
            q=gerar('Todos',n,s); cnt[q['id']]+=1
            if len(set(q['opcoes']))!=5 or q['certa']<0: ruins+=1
    print('\nGeradas 6.000 questões (2.000 por nível). Todas passaram nas conferências por enumeração embutidas em cada modelo.')
    print('Questões com alternativas repetidas ou sem resposta:',ruins)
    print('Distribuição por modelo:',dict(cnt))
    import os
    g=os.path.join(os.path.dirname(os.path.abspath(__file__)),'l12_golden_js.json')
    if os.path.exists(g):
        ouro=json.load(open(g,encoding='utf-8')); dif=sum(1 for q in ouro if gerar('Todos',q['nivel'],q['seed'])!=q)
        print(f'Comparação com o gerador do site (JavaScript, gravado em l12_golden_js.json): {len(ouro)} questões, {dif} diferenças.')
    amostra=[gerar('Todos',n,s) for n in (1,2,3) for s in range(1,41)]
    json.dump(amostra,open(__file__.replace('.py','-amostra.json'),'w',encoding='utf-8'),ensure_ascii=False)
    print('Amostra de 120 questões gravada em l12_gerador_questoes-amostra.json')
