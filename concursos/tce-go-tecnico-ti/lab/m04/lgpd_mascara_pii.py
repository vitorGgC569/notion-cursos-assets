# LGPD aplicada a dados de treino: detectar e mascarar identificadores, pseudonimizar com HMAC e checar k-anonimato.
import re,hmac,hashlib,collections
TEXTO=('Processo 123: o servidor João da Silva, CPF 529.982.247-25, e-mail joao.silva@exemplo.gov.br, '
       'telefone (62) 98888-7777, relatou o fato. CPF inválido de teste: 111.111.111-11.')
def cpf_valido(c):
    n=[int(x) for x in re.sub(r'\D','',c)]
    if len(n)!=11 or len(set(n))==1: return False
    for i in (9,10):
        s=sum(n[j]*(i+1-j) for j in range(i)); d=(s*10%11)%10
        if d!=n[i]: return False
    return True
def mascarar(t):
    t=re.sub(r'\b\d{3}\.\d{3}\.\d{3}-\d{2}\b',lambda m:'[CPF]' if cpf_valido(m.group()) else m.group(),t)
    t=re.sub(r'[\w.+-]+@[\w-]+(\.[\w-]+)+','[EMAIL]',t)
    t=re.sub(r'\(\d{2}\)\s?\d{4,5}-\d{4}','[TELEFONE]',t)
    return t
print('ORIGINAL :',TEXTO); print('MASCARADO:',mascarar(TEXTO))
print('\nCPF 529.982.247-25 válido?',cpf_valido('529.982.247-25'),'| 111.111.111-11 válido?',cpf_valido('111.111.111-11'))
SAL=b'segredo-guardado-a-parte'
pseudo=lambda v:hmac.new(SAL,v.encode(),hashlib.sha256).hexdigest()[:12]
print('\nPseudonimização (HMAC-SHA256 com chave guardada à parte):')
print('  529.982.247-25 ->',pseudo('529.982.247-25'),'(mesmo valor, mesmo pseudônimo: permite juntar bases)')
print('  outro CPF      ->',pseudo('390.533.447-05'))
print('  Continua sendo dado pessoal: quem tem a chave consegue reidentificar.')
reg=[('74','F','Goiânia'),('74','F','Goiânia'),('74','M','Goiânia'),('31','F','Anápolis'),('31','F','Anápolis'),('52','M','Rio Verde')]
cont=collections.Counter(reg); k=min(cont.values())
print(f'\nk-anonimato dos quase-identificadores (idade, sexo, cidade): k = {k}')
print('  grupos com 1 pessoa (reidentificáveis):',[g for g,c in cont.items() if c==1])
gen=[(a[0]+'x',s,'GO') for a,s,c in reg]; cont2=collections.Counter(gen)
print('  após generalizar idade (7x, 3x, 5x) e cidade (GO):',dict(cont2),'-> k =',min(cont2.values()))
sup=[r for r in gen if cont2[r]>=2]; cont3=collections.Counter(sup)
print('  suprimindo os registros que continuam únicos:',len(reg)-len(sup),'removidos ->',dict(cont3),'-> k =',min(cont3.values()))
print('  Trade-off: mais anonimato, menos informação (utilidade) para o modelo.')
