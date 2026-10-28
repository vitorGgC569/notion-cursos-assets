"""Padroes criacionais GoF em Python: Singleton, Factory Method, Abstract Factory e Builder."""
import threading

# ---- Singleton
class Configuracao:
    _instancia = None
    _lock = threading.Lock()
    def __new__(cls):
        with cls._lock:
            if cls._instancia is None:
                cls._instancia = super().__new__(cls)
                cls._instancia.valores = {}
        return cls._instancia

# ---- Factory Method: a subclasse decide qual produto criar
class Documento:
    def exportar(self): raise NotImplementedError
class Pdf(Documento):
    def exportar(self): return 'exportando em PDF'
class Html(Documento):
    def exportar(self): return 'exportando em HTML'
class Editor:
    def criar_documento(self): raise NotImplementedError   # o factory method
    def salvar(self): return self.criar_documento().exportar()
class EditorPdf(Editor):
    def criar_documento(self): return Pdf()
class EditorWeb(Editor):
    def criar_documento(self): return Html()

# ---- Abstract Factory: familias de objetos relacionados
class BotaoClaro:  desenhar = lambda self: 'botao claro'
class JanelaClara: desenhar = lambda self: 'janela clara'
class BotaoEscuro: desenhar = lambda self: 'botao escuro'
class JanelaEscura:desenhar = lambda self: 'janela escura'
class FabricaTema:
    def botao(self): raise NotImplementedError
    def janela(self): raise NotImplementedError
class FabricaClara(FabricaTema):
    def botao(self): return BotaoClaro()
    def janela(self): return JanelaClara()
class FabricaEscura(FabricaTema):
    def botao(self): return BotaoEscuro()
    def janela(self): return JanelaEscura()
def montar_tela(fabrica):   # o cliente so conhece a fabrica abstrata
    return [fabrica.janela().desenhar(), fabrica.botao().desenhar()]

# ---- Builder: constroi objeto complexo em etapas
class Relatorio:
    def __init__(self): self.partes = []
    def __repr__(self): return ' | '.join(self.partes)
class RelatorioBuilder:
    def __init__(self): self._r = Relatorio()
    def titulo(self, t): self._r.partes.append(f'titulo={t}'); return self
    def tabela(self, linhas): self._r.partes.append(f'tabela({linhas} linhas)'); return self
    def rodape(self, t): self._r.partes.append(f'rodape={t}'); return self
    def build(self): return self._r

if __name__ == '__main__':
    a, b = Configuracao(), Configuracao()
    a.valores['modo'] = 'producao'
    print('Singleton: a is b ->', a is b, '| b.valores ->', b.valores)
    for e in (EditorPdf(), EditorWeb()):
        print('Factory Method:', type(e).__name__, '->', e.salvar())
    print('Abstract Factory (claro):', montar_tela(FabricaClara()))
    print('Abstract Factory (escuro):', montar_tela(FabricaEscura()))
    print('Builder:', RelatorioBuilder().titulo('Auditoria 2026').tabela(12).rodape('TCE-GO').build())
