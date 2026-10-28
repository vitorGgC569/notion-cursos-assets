# Rede neural 2-4-1 feita do zero (só biblioteca padrão) aprendendo o XOR, que um único neurônio linear não consegue.
import math,random
random.seed(7)
sig=lambda z:1/(1+math.exp(-z))
X=[(0,0),(0,1),(1,0),(1,1)]; Y=[0,1,1,0]
H=4; lr=1.0
W1=[[random.uniform(-1,1) for _ in range(2)] for _ in range(H)]; b1=[0.0]*H
W2=[random.uniform(-1,1) for _ in range(H)]; b2=0.0
def forward(x):
    h=[sig(W1[j][0]*x[0]+W1[j][1]*x[1]+b1[j]) for j in range(H)]
    return h,sig(sum(W2[j]*h[j] for j in range(H))+b2)
def perda():
    return sum((forward(x)[1]-y)**2 for x,y in zip(X,Y))/4
for ep in range(0,5001):
    if ep in (0,100,500,1000,2000,5000): print(f'época {ep:5d}  perda = {perda():.5f}')
    for x,y in zip(X,Y):
        h,a=forward(x)
        da=2*(a-y)*a*(1-a)                      # dL/dz da saída (retropropagação)
        for j in range(H):
            dh=da*W2[j]*h[j]*(1-h[j])           # regra da cadeia até a camada oculta
            W2[j]-=lr*da*h[j]
            W1[j][0]-=lr*dh*x[0]; W1[j][1]-=lr*dh*x[1]; b1[j]-=lr*dh
        b2-=lr*da
print('\nentrada  esperado  saída da rede  classe')
for x,y in zip(X,Y):
    a=forward(x)[1]; print(f'{x}     {y}        {a:.4f}        {int(a>0.5)}')
acertos=sum(int(forward(x)[1]>0.5)==y for x,y in zip(X,Y)); print(f'\nacertos: {acertos}/4')
