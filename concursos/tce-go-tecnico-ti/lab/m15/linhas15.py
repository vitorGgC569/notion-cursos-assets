# -*- coding: utf-8 -*-
# Contador de linhas ESTIMADO, igual ao do site de treino (sites/assets/discursiva-core.js).
# Regra: cada paragrafo (linha de texto separada por Enter) comeca em linha nova; as palavras sao colocadas
# uma a uma ate completar "cpl" caracteres (quebra gulosa); paragrafo vazio conta 1 linha; Enter no fim do texto nao conta.
# Palavra maior que a linha e quebrada em pedacos de "cpl" caracteres. Texto vazio = 0 linhas.
# E uma ESTIMATIVA: a folha real depende da sua letra. Calibre "cpl" escrevendo um texto a mao na folha de resposta.
import re,unicodedata
def norm(s):
    s=unicodedata.normalize('NFD',s.lower()); return ''.join(c for c in s if unicodedata.category(c)!='Mn')
def count_lines(text,cpl=90):
    paras=text.replace('\r','').split('\n')
    while paras and not paras[-1].strip(): paras.pop()
    n=0
    for p in paras:
        words=p.split()
        if not words: n+=1; continue
        lines=1; cur=0
        for w in words:
            L=len(w)
            if L>cpl:
                if cur>0: lines+=1
                extra=-(-L//cpl)-1; lines+=extra; cur=L-extra*cpl
            elif cur==0: cur=L
            elif cur+1+L<=cpl: cur+=1+L
            else: lines+=1; cur=L
        n+=lines
    return n
def count_words(text): return len(text.split())
def hits(text,terms):
    t=norm(text); return [x for x in terms if norm(x) in t]
