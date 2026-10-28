"""Pratica 9: codigo gerado por IA so vale depois de testado: pass@1 num mini-benchmark + estimador pass@k."""
from lib import *
import subprocess, tempfile, textwrap, math
TASKS = [
 ("soma_pares", "def soma_pares(xs): recebe uma lista de inteiros e devolve a soma dos números pares.", "assert soma_pares([1,2,3,4])==6 and soma_pares([])==0 and soma_pares([7])==0"),
 ("eh_palindromo", "def eh_palindromo(s): devolve True se a string é palíndromo, ignorando maiúsculas e espaços.", "assert eh_palindromo('Ana')==True and eh_palindromo('a n a')==True and eh_palindromo('abc')==False"),
 ("maior_diferenca", "def maior_diferenca(xs): devolve a maior diferença (máximo menos mínimo) de uma lista não vazia de números.", "assert maior_diferenca([3,9,1])==8 and maior_diferenca([5])==0"),
 ("contar_vogais", "def contar_vogais(s): devolve quantas vogais (a,e,i,o,u, sem acento, minúsculas ou maiúsculas) a string tem.", "assert contar_vogais('Banana')==3 and contar_vogais('xyz')==0 and contar_vogais('AEIOU')==5"),
 ("fatorial", "def fatorial(n): devolve n! para n >= 0 (fatorial(0) == 1).", "assert fatorial(0)==1 and fatorial(5)==120"),
 ("fizzbuzz", "def fizzbuzz(n): devolve 'FizzBuzz' se n é múltiplo de 3 e de 5, 'Fizz' se só de 3, 'Buzz' se só de 5, senão str(n).", "assert fizzbuzz(15)=='FizzBuzz' and fizzbuzz(9)=='Fizz' and fizzbuzz(10)=='Buzz' and fizzbuzz(7)=='7'"),
 ("remover_duplicados", "def remover_duplicados(xs): remove duplicados de uma lista mantendo a ordem da primeira ocorrência.", "assert remover_duplicados([3,1,3,2,1])==[3,1,2] and remover_duplicados([])==[]"),
 ("media_ponderada", "def media_ponderada(valores, pesos): devolve a média ponderada (soma de valor*peso dividida pela soma dos pesos).", "assert abs(media_ponderada([8,6],[2,3])-6.8)<1e-9"),
]
PROIBIDO = re.compile(r"\b(import\s+(os|sys|subprocess|socket|shutil|requests)|open\(|__import__|exec\(|eval\()")
def extrai(txt):
    m = re.search(r"```(?:python)?\n(.*?)```", txt, re.S)
    return (m.group(1) if m else txt).strip()
def roda(codigo, teste):
    if PROIBIDO.search(codigo): return "BLOQUEADO pela checagem estática"
    with tempfile.TemporaryDirectory() as d:
        open(d + "/t.py", "w").write(codigo + "\n\n" + teste + "\n")
        try:
            r = subprocess.run([sys.executable, "-I", d + "/t.py"], capture_output=True, text=True, timeout=10, cwd=d)
        except subprocess.TimeoutExpired: return "TIMEOUT"
        if r.returncode == 0: return "passou"
        return "falhou: " + (r.stderr.strip().splitlines() or ["?"])[-1][:70]
def passk(n, c, k):
    return 1.0 if n - c < k else 1 - math.comb(n - c, k) / math.comb(n, k)
res = []; falhas = []
SYSM = "Você escreve código Python correto. Responda só com um bloco de código ```python, sem explicações e sem usar imports."
for nome, enun, teste in TASKS:
    r, u = chat([{"role": "system", "content": SYSM}, {"role": "user", "content": enun}], max_tokens=200)
    st = roda(extrai(r), teste); res.append(st == "passou")
    if st != "passou": falhas.append((nome, enun, teste, r, st))
    print(f"{nome:20s} tokens_saida={u['completion_tokens']:3d} -> {st}")
print(f"\npass@1 (1 amostra por tarefa, temperatura 0): {sum(res)}/{len(res)} = {sum(res)/len(res):.0%}")
print("\n--- laço de correção: devolver a mensagem do teste ao modelo e tentar de novo (1 retentativa) ---")
rec = 0
for nome, enun, teste, r, st in falhas:
    msgs = [{"role": "system", "content": SYSM}, {"role": "user", "content": enun}, {"role": "assistant", "content": r},
            {"role": "user", "content": "O teste automatizado falhou com: " + st + ". Corrija a função. Teste que roda: " + teste}]
    r2, _ = chat(msgs, max_tokens=200)
    st2 = roda(extrai(r2), teste); rec += st2 == "passou"
    print(f"{nome:20s} 1a tentativa: {st[:40]:40s} | 2a tentativa: {st2[:40]}")
print(f"com 1 retentativa guiada pelo teste: {sum(res) + rec}/{len(res)} = {(sum(res) + rec)/len(res):.0%} (de {sum(res)}/{len(res)} na primeira)")
print("\n--- estimador pass@k (n amostras, c corretas) ---")
for n, c, k in ((5, 2, 1), (5, 2, 2), (10, 3, 1), (10, 3, 5), (5, 0, 3), (5, 4, 2)):
    print(f"n={n:2d} c={c} k={k} -> pass@k = {passk(n, c, k):.4f}")
print("\n--- o teste automatizado como porteiro ---")
ruim = "def fatorial(n):\n    return n * fatorial(n - 1) if n > 1 else 0\n"
print("codigo plausivel e errado:", roda(ruim, TASKS[4][2]))
