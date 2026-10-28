"""SOLID na pratica: antes (viola SRP, OCP e DIP) e depois (refatorado)."""
# ---------------- ANTES
class RelatorioRuim:
    def gerar(self, tipo, dados):
        if tipo == 'pdf':   saida = f'[PDF] {sum(dados)}'
        elif tipo == 'csv': saida = ','.join(map(str, dados))
        else: raise ValueError(tipo)             # cada novo formato exige editar esta classe (OCP)
        print('gravando em disco ->', saida)     # calculo, formatacao e I/O misturados (SRP)
        return saida

# ---------------- DEPOIS
from abc import ABC, abstractmethod
class Formato(ABC):                              # abstracao: aberto para extensao
    @abstractmethod
    def formatar(self, dados): ...
class Pdf(Formato):
    def formatar(self, dados): return f'[PDF] {sum(dados)}'
class Csv(Formato):
    def formatar(self, dados): return ','.join(map(str, dados))
class Json(Formato):                             # novo formato: classe nova, sem alterar as outras
    def formatar(self, dados): return '{"dados": %s}' % list(dados)
class Saida(ABC):
    @abstractmethod
    def gravar(self, texto): ...
class Console(Saida):
    def gravar(self, texto): print('gravando ->', texto)
class Memoria(Saida):                            # dublê para teste (DIP)
    def __init__(self): self.itens = []
    def gravar(self, texto): self.itens.append(texto)
class Relatorio:                                 # depende de abstracoes, injetadas no construtor
    def __init__(self, formato: Formato, saida: Saida): self.formato, self.saida = formato, saida
    def gerar(self, dados):
        texto = self.formato.formatar(dados); self.saida.gravar(texto); return texto

# Liskov: qualquer Formato pode substituir outro sem quebrar o cliente
if __name__ == '__main__':
    dados = [10, 20, 30]
    print('ANTES:'); RelatorioRuim().gerar('pdf', dados)
    print('DEPOIS:')
    for f in (Pdf(), Csv(), Json()):
        Relatorio(f, Console()).gerar(dados)
    m = Memoria(); Relatorio(Csv(), m).gerar(dados)
    print('teste sem I/O real, a saida ficou em memoria:', m.itens)
