# Métricas de classificação a partir da matriz de confusão, e por que a acurácia engana.
def metricas(vp,fp,fn,vn):
    t=vp+fp+fn+vn
    d=lambda a,b:a/b if b else float('nan')
    pre,rec=d(vp,vp+fp),d(vp,vp+fn)
    f1=d(2*pre*rec,pre+rec) if pre==pre and rec==rec else float('nan')
    return dict(acuracia=(vp+vn)/t,precisao=pre,recall=rec,especificidade=d(vn,vn+fp),f1=f1)
def mostra(nome,vp,fp,fn,vn):
    print(f'== {nome}: VP={vp} FP={fp} FN={fn} VN={vn}')
    for k,v in metricas(vp,fp,fn,vn).items(): print(f'  {k:15s} {v:7.4f}')
mostra('Exemplo da calculadora (notas fiscais)',30,20,10,140)
mostra('Modelo ingênuo: tudo "legítimo" em base com 1% de fraude',0,0,10,990)
mostra('Modelo útil na mesma base',8,12,2,978)
# AUC pela definição: probabilidade de um positivo ter escore maior que um negativo
pos=[0.9,0.8,0.75,0.6,0.55]; neg=[0.7,0.5,0.4,0.35,0.3,0.2]
par=[(p>n)+0.5*(p==n) for p in pos for n in neg]
print(f'\nAUC por pares (5 positivos x 6 negativos): {sum(par)/len(par):.4f}')
# F1 = média harmônica: nunca maior que a menor entre precisão e recall? (F1 <= média aritmética)
p,r=0.9,0.1
print(f'precisão={p} recall={r}: média aritmética={(p+r)/2:.2f}, F1={2*p*r/(p+r):.2f}')
