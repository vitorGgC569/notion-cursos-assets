# L6: estrutura do TCE-GO a partir da LOTCE (art. 8) e da RA 14/2025 (art. 2)
import re,sys; sys.path.insert(0,'.'); import quotes
l=quotes.txt('lei16168'); i=l.find('Art. 8º Integram'); b=l[i:i+420]
itens=re.findall(r'([IVX]+) – ([^;]+?)(?=;| - Revogado|\.)',b)
print('LOTCE art. 8, integrantes:',len(itens))
for r,x in itens: print('  ',r,x.strip())
print('  (o inciso III, Auditorias, aparece no texto com a marca Revogado pela Lei 17.260/2011, art. 6)' if 'Revogado pela Lei nº 17.260' in b else '')
q=quotes.get('ra14a2'); corpo=q.split('compõe-se dos seguintes órgãos e unidades organizacionais assim agrupados:')[1]
partes=re.split(r' (?=[IVX]+ - [A-ZÓÚ])',corpo.strip())
print('\nRA 14/2025 art. 2, grupos:',len(partes)); tot=0
for p in partes:
    r,resto=p.split(' - ',1); g,u=resto.split(': ',1)
    un=[x.strip(' .') for x in re.split(r'[;.]? (?:e )?[a-e]\) ',' '+u) if x.strip(' .')]
    tot+=len(un); print(f'  {r:<4}{g:<46}{len(un)}: '+' | '.join(un))
print('  total de unidades citadas no art. 2:',tot)
