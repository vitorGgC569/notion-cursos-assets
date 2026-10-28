"""Decorator, Adapter, Strategy, Observer e Command (com desfazer) em Python."""
# ---- Decorator: acrescenta responsabilidade sem mudar a classe
class Cafe:
    def custo(self): return 5.0
    def descricao(self): return 'cafe'
class ComLeite:
    def __init__(self, base): self.base = base
    def custo(self): return self.base.custo() + 1.5
    def descricao(self): return self.base.descricao() + ' + leite'
class ComChantilly:
    def __init__(self, base): self.base = base
    def custo(self): return self.base.custo() + 2.0
    def descricao(self): return self.base.descricao() + ' + chantilly'

# ---- Adapter: converte uma interface na esperada pelo cliente
class SistemaLegado:
    def obterDadosEmXml(self): return '<p><nome>Ana</nome></p>'
class AdaptadorJson:
    def __init__(self, legado): self.legado = legado
    def obter_json(self):
        xml = self.legado.obterDadosEmXml()
        nome = xml.split('<nome>')[1].split('</nome>')[0]
        return {'nome': nome}

# ---- Strategy: algoritmos intercambiaveis por composicao
def frete_economico(kg): return 10 + 2 * kg
def frete_expresso(kg): return 25 + 5 * kg
class Pedido:
    def __init__(self, kg, estrategia): self.kg, self.estrategia = kg, estrategia
    def frete(self): return self.estrategia(self.kg)

# ---- Observer: notifica dependentes
class Sensor:
    def __init__(self): self._obs, self.valor = [], None
    def assinar(self, f): self._obs.append(f)
    def definir(self, v):
        self.valor = v
        for f in self._obs: f(v)

# ---- Command: requisicao como objeto, com desfazer
class Editor:
    def __init__(self): self.texto = ''
class Inserir:
    def __init__(self, ed, t): self.ed, self.t = ed, t
    def executar(self): self.ed.texto += self.t
    def desfazer(self): self.ed.texto = self.ed.texto[:-len(self.t)]

if __name__ == '__main__':
    c = ComChantilly(ComLeite(Cafe()))
    print('Decorator:', c.descricao(), '->', f'R$ {c.custo():.2f}')
    print('Adapter:', AdaptadorJson(SistemaLegado()).obter_json())
    for nome, f in (('economico', frete_economico), ('expresso', frete_expresso)):
        print('Strategy:', nome, '->', Pedido(3, f).frete())
    s, log = Sensor(), []
    s.assinar(lambda v: log.append(f'painel={v}')); s.assinar(lambda v: log.append(f'alarme={"SIM" if v > 80 else "nao"}'))
    s.definir(70); s.definir(95)
    print('Observer:', log)
    ed = Editor(); historico = []
    for t in ('Ola', ', ', 'TCE'):
        cmd = Inserir(ed, t); cmd.executar(); historico.append(cmd)
    print('Command executado:', repr(ed.texto))
    historico.pop().desfazer()
    print('Command apos desfazer:', repr(ed.texto))
