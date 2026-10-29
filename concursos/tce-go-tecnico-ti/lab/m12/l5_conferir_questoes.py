# L5: confere as 4 questoes reais da FCC (TCE-GO 2009, caderno N14) com os textos em vigor
import re,sys; sys.path.insert(0,'.'); import quotes
G={25:'E',26:'A',27:'E',28:'B'}  # gabarito tipo 1, cargo N14, lido do PDF oficial baixado
ev=[(25,'lei16168','até 60 (sessenta) dias após a abertura da sessão legislativa','Lei 16.168 art. 56'),
    (26,'lei16168','§ 2º Definitiva é a decisão pela qual o Tribunal julga as contas regulares, regulares com ressalva ou irregulares','Lei 16.168 art. 66, par. 2'),
    (27,'ce','§ 2o Se a Assembleia Legislativa ou o Poder Executivo, no prazo de noventa dias','CE-GO art. 26, par. 2'),
    (28,'ri','somente poderão ser abertas com quórum mínimo de 4 (quatro) Conselheiros, incluído o Presidente','RI art. 113')]
for n,f,frag,onde in ev:
    ok=frag in quotes.txt(f)
    print(f'Q{n}: gabarito FCC = {G[n]} | trecho vigente encontrado em {onde}: {"SIM" if ok else "NAO"}')
print('\nObservacao: a prova e de 2009; o teste acima so mostra que o texto atual ainda sustenta o gabarito.')
