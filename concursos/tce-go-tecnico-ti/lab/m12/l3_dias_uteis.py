# L3: contagem de prazo em dias uteis conforme LOTCE art. 55 (exclui o dia do comeco, inclui o do vencimento)
import datetime as dt,sys
# feriados nacionais de 2026 listados por mim (nao ha calendario oficial do TCE-GO nesta fonte)
FER={dt.date(2026,1,1):'Confraternizacao',dt.date(2026,4,3):'Sexta-feira Santa',dt.date(2026,4,21):'Tiradentes',dt.date(2026,5,1):'Trabalho',dt.date(2026,9,7):'Independencia',dt.date(2026,10,12):'N. Sra. Aparecida',dt.date(2026,11,2):'Finados',dt.date(2026,11,15):'Proclamacao (domingo)',dt.date(2026,11,20):'Consciencia Negra',dt.date(2026,12,25):'Natal'}
def util(d,fer=FER): return d.weekday()<5 and d not in fer
def prazo_uteis(inicio,n,fer=FER):
    d=inicio; c=0
    while c<n:
        d+=dt.timedelta(days=1)
        if util(d,fer): c+=1
    return d
def prazo_corridos(inicio,n): return inicio+dt.timedelta(days=n)
casos=[('Citacao recebida; defesa (art. 67, II): 15 dias',dt.date(2026,10,28),15),
       ('Embargos de declaracao (art. 127, par. 1): 5 dias',dt.date(2026,10,28),5),
       ('Agravo (art. 128): 10 dias',dt.date(2026,11,10),10),
       ('Recurso de reconsideracao (art. 125): 15 dias (datas hipoteticas)',dt.date(2026,11,23),15),
       ('Pagamento de debito/multa (art. 80): 15 dias',dt.date(2026,9,1),15)]
print('Regra do art. 55: dias uteis, exclui o dia do comeco, inclui o do vencimento.')
print('Calendario usado: sabados, domingos e 10 feriados nacionais de 2026 (lista no script). Feriados estaduais/municipais e pontos facultativos NAO considerados.\n')
for nome,i,n in casos:
    u=prazo_uteis(i,n); c=prazo_corridos(i,n)
    print(f'{nome}\n  inicio {i:%d/%m/%Y} ({i:%a}) -> vence {u:%d/%m/%Y} ({u:%a}) em dias uteis | em dias corridos seria {c:%d/%m/%Y} | diferenca {(u-c).days} dias')
print('\ncaso-limite: o dia do comeco e excluido, mesmo que seja util')
i=dt.date(2026,10,30); print('  inicio sexta',i,'+1 dia util ->',prazo_uteis(i,1))
