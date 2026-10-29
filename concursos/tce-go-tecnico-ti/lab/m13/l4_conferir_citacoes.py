# L4: confere que cada citacao entre aspas da Teoria existe, literalmente, no texto oficial baixado.
import sys; sys.path.insert(0,'.'); import quotes
ok=falha=0
for k,(v,f) in quotes.all_().items():
    if v and v in quotes.txt(f): ok+=1; print('OK    %-12s %-14s %4d caracteres'%(k,f,len(v)))
    else: falha+=1; print('FALHA %-12s %s'%(k,f))
print('\ncitacoes conferidas: %d OK, %d FALHA'%(ok,falha))
sys.exit(1 if falha else 0)
