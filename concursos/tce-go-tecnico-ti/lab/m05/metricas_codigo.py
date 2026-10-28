"""Metricas de codigo com ast: complexidade ciclomatica, tamanho de funcoes, acoplamento e coesao (LCOM) e juros da divida tecnica."""
import ast, textwrap

CODIGO = textwrap.dedent('''
    class Processador:
        def __init__(self):
            self.itens = []
            self.total = 0
        def adicionar(self, item):
            self.itens.append(item)
        def somar(self):
            self.total = sum(i.valor for i in self.itens)
            return self.total
        def imprimir_nota(self, cliente, banco):
            banco.gravar(cliente)
            Impressora().enviar(cliente)
            Email().enviar(cliente)
        def classificar(self, x):
            if x < 0:
                return 'neg'
            elif x == 0:
                return 'zero'
            for i in range(3):
                if i == x and x > 1:
                    return 'pequeno'
            return 'grande'
''')
tree = ast.parse(CODIGO)
RAMOS = (ast.If, ast.For, ast.While, ast.ExceptHandler, ast.IfExp, ast.comprehension, ast.BoolOp)
def cc(fn):  # McCabe simplificado: 1 + pontos de decisao
    return 1 + sum(isinstance(n, RAMOS) for n in ast.walk(fn)) + sum(len(n.values) - 2 for n in ast.walk(fn) if isinstance(n, ast.BoolOp))
cls = next(n for n in tree.body if isinstance(n, ast.ClassDef))
metodos = [n for n in cls.body if isinstance(n, ast.FunctionDef)]
print(f'{"metodo":<16}{"linhas":>7}{"CC":>5}  risco')
for m in metodos:
    c = cc(m); linhas = m.end_lineno - m.lineno + 1
    print(f'{m.name:<16}{linhas:>7}{c:>5}  ' + ('alto (>10)' if c > 10 else 'moderado (5-10)' if c >= 5 else 'baixo'))
# acoplamento: classes e objetos externos usados pelos metodos
ext = set()
for n in ast.walk(cls):
    if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id[:1].isupper(): ext.add(n.func.id)
for m in metodos:
    for a in m.args.args[1:]:
        if a.arg in ('banco',): ext.add(a.arg + ' (parametro)')
print('\nacoplamento (dependencias externas):', sorted(ext), '->', len(ext))
# coesao: LCOM simplificado = pares de metodos que nao compartilham atributos - pares que compartilham
uso = {}
for m in metodos:
    if m.name == '__init__': continue
    uso[m.name] = {n.attr for n in ast.walk(m) if isinstance(n, ast.Attribute) and isinstance(n.value, ast.Name) and n.value.id == 'self'}
nomes = list(uso); sem = com = 0
for i in range(len(nomes)):
    for j in range(i + 1, len(nomes)):
        if uso[nomes[i]] & uso[nomes[j]]: com += 1
        else: sem += 1
print('atributos usados por metodo:', {k: sorted(v) for k, v in uso.items()})
print(f'pares sem atributo em comum = {sem}, pares com = {com}, LCOM = {max(sem - com, 0)} (quanto maior, menor a coesao)')

# juros da divida tecnica: custo extra por mudanca cresce a cada release sem refatorar
print('\nSimulacao didatica de divida tecnica (valores ilustrativos):')
custo, juros, juros_pos = 10.0, 0.08, 0.02
print(f'{"release":<9}{"sem refatorar":>15}{"refatorando na 4":>19}')
a = b = custo
for r in range(1, 9):
    a *= 1 + juros                      # a divida acumula juros a cada release
    if r < 4: b *= 1 + juros
    elif r == 4: b = custo * 0.9        # a refatoracao paga o principal e zera os juros acumulados
    else: b *= 1 + juros_pos            # depois, o custo cresce bem mais devagar
    print(f'{r:<9}{a:>15.2f}{b:>19.2f}')
