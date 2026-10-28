import unittest
from calc import soma, divide


class TesteCalc(unittest.TestCase):
    def test_soma(self):
        self.assertEqual(soma(2, 3), 5)

    def test_divide(self):
        self.assertEqual(divide(6, 3), 2)

    def test_divide_por_zero(self):
        with self.assertRaises(ValueError):
            divide(1, 0)


if __name__ == "__main__":
    unittest.main()
