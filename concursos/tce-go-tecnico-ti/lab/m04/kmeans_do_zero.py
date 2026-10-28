# k-means do zero com os mesmos 8 pontos do explicador animado, centroides iniciais A e D.
P={'A':(1,1),'B':(1.5,2),'C':(3,4),'D':(5,7),'E':(3.5,5),'F':(4.5,5),'G':(3.5,4.5),'H':(6,6.5)}
cent=[P['A'],P['D']]
d2=lambda p,c:(p[0]-c[0])**2+(p[1]-c[1])**2
for it in range(1,11):
    grupo={n:min(range(2),key=lambda k:d2(p,cent[k])) for n,p in P.items()}
    novo=[]
    for k in range(2):
        m=[P[n] for n in P if grupo[n]==k]
        novo.append((sum(p[0] for p in m)/len(m),sum(p[1] for p in m)/len(m)))
    print(f'iteração {it}: C1 grupo={[n for n in P if grupo[n]==0]}  C2 grupo={[n for n in P if grupo[n]==1]}')
    print(f'   novos centroides: C1=({novo[0][0]:.2f}; {novo[0][1]:.2f})  C2=({novo[1][0]:.2f}; {novo[1][1]:.2f})')
    if novo==cent: print('   convergiu: centroides não mudaram'); break
    cent=novo
inercia=sum(d2(P[n],cent[grupo[n]]) for n in P); print(f'\ninércia (soma das distâncias² ao centroide): {inercia:.3f}')
