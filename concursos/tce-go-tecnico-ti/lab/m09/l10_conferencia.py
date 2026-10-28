"""Pratica 10: conferencia das formulas do modulo (Python) com os valores usados no gerador do site (JavaScript)."""
from lib import *
import subprocess, json as J, math
casos = {
 "trechos": [(1000, 120, 20), (3000, 120, 20), (5000, 500, 50), (95, 100, 10)],
 "contexto": [(5000, 15), (4, 120)],
 "cos": [([1, 2, 3], [4, 5, 6]), ([1, 0], [0, 1]), ([2, 0, 1], [1, 0, 2])],
 "prec": [(["a", "b", "c", "d"], {"a", "c", "x"}, 3), (["x", "y", "a"], {"a", "b"}, 2)],
 "passk": [(5, 2, 1), (5, 2, 2), (10, 3, 5), (5, 0, 3), (5, 4, 2)],
 "agente": [(500, 300, 6), (800, 450, 4), (200, 100, 10)],
}
py = {
 "trechos": [n_chunks(*c) for c in casos["trechos"]],
 "contexto": [c[0] * c[1] for c in casos["contexto"]],
 "cos": [round(cosine(a, b), 6) for a, b in casos["cos"]],
 "prec": [[precision_at_k(r, rel, k), recall_at_k(r, rel, k), mrr(r, rel)] for r, rel, k in casos["prec"]],
 "passk": [round(1.0 if n - c < k else 1 - math.comb(n - c, k) / math.comb(n, k), 6) for n, c, k in casos["passk"]],
 "agente": [S * N + A * sum(range(N)) for S, A, N in casos["agente"]],
}
js = r"""
const A=require('./fm9.js');
const o={trechos:[[1000,120,20],[3000,120,20],[5000,500,50],[95,100,10]].map(c=>A.nChunks(...c)),
 contexto:[[5000,15],[4,120]].map(c=>c[0]*c[1]),
 cos:[[[1,2,3],[4,5,6]],[[1,0],[0,1]],[[2,0,1],[1,0,2]]].map(c=>Math.round(A.cosine(c[0],c[1])*1e6)/1e6),
 passk:[[5,2,1],[5,2,2],[10,3,5],[5,0,3],[5,4,2]].map(c=>Math.round(A.passK(...c)*1e6)/1e6),
 agente:[[500,300,6],[800,450,4],[200,100,10]].map(c=>A.agentTokens(...c)),
 prec:[[['a','b','c','d'],['a','c','x'],3],[['x','y','a'],['a','b'],2]].map(c=>[A.precisionAtK(c[0],c[1],c[2]),A.recallAtK(c[0],c[1],c[2]),A.mrr(c[0],c[1])])};
console.log(JSON.stringify(o));
"""
d = os.path.dirname(os.path.abspath(__file__))
open(d + "/_cmp.js", "w").write(js)
out = subprocess.run(["node", d + "/_cmp.js"], capture_output=True, text=True, cwd=d)
os.remove(d + "/_cmp.js")
print(out.stderr[:300] if out.returncode else "")
jsr = J.loads(out.stdout)
for k in py:
    same = all((abs(x - y) < 1e-9 if isinstance(x, float) else x == y) for x, y in zip(sum(py[k], []) if isinstance(py[k][0], list) else py[k], sum(jsr[k], []) if isinstance(jsr[k][0], list) else jsr[k]))
    print(f"{k:9s} python={py[k]}\n{'':9s} js    ={jsr[k]} -> {'IGUAIS' if same else 'DIVERGEM'}")
print("\n--- caso TJ-RJ (chunk_size=5000, k=15) ---")
print("chunk_size=5000 caracteres, k=15 -> ate", 5000 * 15, "caracteres recuperados (~", round(5000 * 15 / 4), "tokens a 4 car/token)")
print("com janela de 4096 tokens o prompt NAO cabe: erro de contexto; reduzir k ou chunk_size")
print("chunk_overlap=0: sem sobreposicao, uma resposta que atravessa a fronteira de dois trechos pode ser cortada")
