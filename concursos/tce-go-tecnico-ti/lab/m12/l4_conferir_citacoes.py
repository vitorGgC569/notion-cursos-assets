# L4: confere que cada citacao literal usada na teoria existe nos textos oficiais baixados
import sys; sys.path.insert(0,'.'); import quotes
ok=0;bad=[]
for k,(v,f) in quotes.all_().items():
    if v and v in quotes.txt(f): ok+=1; print(f'OK   {k:<10} {f:<10} {len(v):>4} caracteres')
    else: bad.append(k); print('FALHA',k)
print(f'\n{ok} citacoes literais conferidas, {len(bad)} falhas')
