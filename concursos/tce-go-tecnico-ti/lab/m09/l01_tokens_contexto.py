"""Pratica 1: tokens, janela de contexto e temperatura, com um modelo local pequeno."""
from lib import *
L = llm()
print("modelo:", os.path.basename(MODEL), "| janela n_ctx =", L.n_ctx())
print("\n--- 1. tokens por tipo de texto ---")
amostras = {
 "portugues": "O assistente deve registrar o incidente em até 48 horas.",
 "ingles": "The assistant must log the incident within 48 hours.",
 "codigo": "def soma(a, b):\n    return a + b\n",
 "numeros": "1234567890 3,14159 2026-10-28",
}
for nome, txt in amostras.items():
    n = len(L.tokenize(txt.encode(), add_bos=False))
    print(f"{nome:10s} caracteres={len(txt):3d} palavras={len(txt.split()):2d} tokens={n:2d} chars/token={len(txt)/n:.2f}")
print("\n--- 2. estouro da janela de contexto ---")
longo = "palavra " * 5000
n = len(L.tokenize(longo.encode(), add_bos=False))
print("texto de 5000 palavras ->", n, "tokens; janela =", L.n_ctx())
try:
    chat([{"role": "user", "content": longo + "\nResuma."}], max_tokens=5)
    print("sem erro")
except Exception as e:
    print("erro:", type(e).__name__, str(e)[:110])
print("\n--- 3. temperatura e determinismo ---")
p = [{"role": "user", "content": "Dê um nome criativo para um robô que revisa código. Responda só com o nome."}]
g = [chat(p, max_tokens=12, temperature=0.0)[0] for _ in range(3)]
print("temperatura 0.0, 3 execucoes:", g, "| identicas:", len(set(g)) == 1)
t = []
for s in (1, 2, 3, 4):
    t.append(chat(p, max_tokens=12, temperature=1.3, seed=s)[0])
print("temperatura 1.3, sementes 1-4:", t, "| distintas:", len(set(t)))
print("\n--- 4. uso reportado pela API ---")
r, u = chat([{"role": "user", "content": "Diga apenas: ok."}], max_tokens=5)
print("resposta:", repr(r), "| usage:", u)
