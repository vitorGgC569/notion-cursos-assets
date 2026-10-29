# Leitor dos textos oficiais baixados (fontes/*.clean.txt): colapsa espacos e separa artigos.
import re,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
def load(nome):
    return re.sub(r'\s+',' ',open(os.path.join(D,nome+'.clean.txt'),encoding='utf-8').read())
def arts(t):
    """dict numero -> lista de trechos. 'Art. N' com A maiusculo; so aceita numeros que seguem a ordem do texto
    (descarta citacoes no meio de frases)."""
    out={};ult=0;pos=[]
    for m in re.finditer(r'Art\. ?(\d+)(-[A-Z])?[º°]?[ .]',t):
        n=int(m.group(1))
        if n>=ult and n<=ult+3: pos.append((m.start(),m.group(1)+(m.group(2) or ''))); ult=n
    for i,(p,n) in enumerate(pos):
        fim=pos[i+1][0] if i+1<len(pos) else len(t)
        out.setdefault(n,[]).append(t[p:fim])
    return out
