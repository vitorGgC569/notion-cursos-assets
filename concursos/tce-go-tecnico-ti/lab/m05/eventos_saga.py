"""Arquitetura orientada a eventos: broker em memoria, consumidor idempotente e saga com compensacao."""
from collections import defaultdict

class Broker:
    def __init__(self): self.assinantes = defaultdict(list); self.log = []
    def assinar(self, topico, f): self.assinantes[topico].append(f)
    def publicar(self, topico, evento):
        self.log.append((topico, evento))
        for f in self.assinantes[topico]: f(evento)

b = Broker()
# ---- consumidor idempotente: processar o mesmo evento duas vezes nao duplica o efeito
processados, estoque = set(), {'caneta': 5}
def baixar_estoque(ev):
    if ev['id'] in processados:
        print('  estoque: evento', ev['id'], 'ja processado, ignorado'); return
    processados.add(ev['id']); estoque[ev['item']] -= ev['qtd']
    print('  estoque: baixou', ev['qtd'], ev['item'], '->', estoque)
b.assinar('pedido.criado', baixar_estoque)
b.assinar('pedido.criado', lambda ev: print('  notificacao: pedido', ev['id'], 'criado'))
print('publicando o mesmo evento duas vezes (entrega "pelo menos uma vez"):')
ev = {'id': 'P-1', 'item': 'caneta', 'qtd': 2}
b.publicar('pedido.criado', ev); b.publicar('pedido.criado', ev)

# ---- saga: transacao distribuida com compensacao
def saga(passos):
    feitos = []
    for nome, acao, compensacao in passos:
        try:
            acao(); feitos.append((nome, compensacao)); print('  ok       ', nome)
        except Exception as e:
            print('  FALHOU   ', nome, '->', e)
            for n, comp in reversed(feitos):
                comp(); print('  compensou', n)
            return False
    return True
def pagar_falha(): raise RuntimeError('cartao recusado')
print('\nsaga 1 (tudo certo):')
print('  resultado:', saga([('reservar estoque', lambda: None, lambda: None), ('cobrar', lambda: None, lambda: None), ('emitir nota', lambda: None, lambda: None)]))
print('\nsaga 2 (pagamento falha):')
print('  resultado:', saga([('reservar estoque', lambda: None, lambda: None), ('cobrar', pagar_falha, lambda: None), ('emitir nota', lambda: None, lambda: None)]))
