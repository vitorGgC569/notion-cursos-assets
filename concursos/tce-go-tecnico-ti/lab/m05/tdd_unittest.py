"""TDD com unittest: ciclo vermelho, verde, refatorar para um calculo de prazo em dias uteis."""
import unittest, sys, datetime as dt

# ---- passo 1 (VERMELHO): so a assinatura; os testes falham
def prazo_final_v0(inicio, dias_uteis):
    raise NotImplementedError

# ---- passo 2 (VERDE): o minimo para passar
def prazo_final_v1(inicio, dias_uteis):
    d = inicio
    while dias_uteis > 0:
        d += dt.timedelta(days=1)
        if d.weekday() < 5: dias_uteis -= 1
    return d

# ---- passo 3 (REFATORAR): nomes e funcao auxiliar, mesmo comportamento
def eh_dia_util(d): return d.weekday() < 5
def prazo_final(inicio, dias_uteis):
    d, restantes = inicio, dias_uteis
    while restantes:
        d += dt.timedelta(days=1)
        restantes -= eh_dia_util(d)
    return d

IMPL = prazo_final_v0 if 'vermelho' in sys.argv else prazo_final

class TestPrazo(unittest.TestCase):
    def test_um_dia_util_de_segunda_vai_para_terca(self):
        self.assertEqual(IMPL(dt.date(2026, 11, 2), 1), dt.date(2026, 11, 3))
    def test_sexta_mais_um_dia_util_vai_para_segunda(self):
        self.assertEqual(IMPL(dt.date(2026, 11, 6), 1), dt.date(2026, 11, 9))
    def test_quinze_dias_uteis(self):
        self.assertEqual(IMPL(dt.date(2026, 11, 2), 15), dt.date(2026, 11, 23))
    def test_zero_dias_mantem_a_data(self):
        self.assertEqual(IMPL(dt.date(2026, 11, 2), 0), dt.date(2026, 11, 2))

if __name__ == '__main__':
    unittest.main(argv=[sys.argv[0], '-v'])
