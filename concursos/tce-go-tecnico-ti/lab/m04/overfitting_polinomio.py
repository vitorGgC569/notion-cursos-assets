# Overfitting na prática: ajuste polinomial de grau crescente a dados com ruído (requer numpy).
import numpy as np
rng=np.random.default_rng(42)
f=lambda x:np.sin(2*np.pi*x)
x=rng.uniform(0,1,30); y=f(x)+rng.normal(0,0.25,30)
xt,yt,xv,yv=x[:15],y[:15],x[15:],y[15:]          # treino e validação
print('grau  erro treino (MSE)  erro validação (MSE)  diagnóstico')
melhor=None
for g in [1,2,3,4,6,9,12]:
    c=np.polyfit(xt,yt,g)
    et=np.mean((np.polyval(c,xt)-yt)**2); ev=np.mean((np.polyval(c,xv)-yv)**2)
    diag='underfitting' if et>0.15 else ('overfitting' if ev>3*et and ev>0.1 else 'bom ajuste')
    if melhor is None or ev<melhor[1]: melhor=(g,ev)
    print(f'{g:4d}  {et:16.4f}  {ev:20.4f}  {diag}')
print(f'\nmelhor grau pela validação: {melhor[0]} (MSE de validação {melhor[1]:.4f})')
# validação cruzada k-fold (k = 5) para o mesmo conjunto
idx=rng.permutation(30); folds=np.array_split(idx,5)
print('\nk-fold (k = 5): MSE médio de teste por grau')
for g in [1,3,9]:
    erros=[]
    for k in range(5):
        te=folds[k]; tr=np.concatenate([folds[j] for j in range(5) if j!=k])
        c=np.polyfit(x[tr],y[tr],g); erros.append(np.mean((np.polyval(c,x[te])-y[te])**2))
    print(f'  grau {g}: {np.mean(erros):.4f}  (desvio padrão entre as rodadas {np.std(erros):.4f})')
