"""Pratica 4: embeddings densos (fastembed, modelo multilingue local) x BM25 x hibrido."""
from lib import *
from corpus import DOCS, QA
import numpy as np
from fastembed import TextEmbedding
NOME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
m = TextEmbedding(NOME)
ids = list(DOCS)
E = np.array(list(m.embed([DOCS[i] for i in ids])))
print("modelo:", NOME, "| dimensao:", E.shape[1], "| vetores:", E.shape[0])
Q = np.array(list(m.embed([q for q, _, _ in QA])))
print("\n--- 1. cosseno: numpy x formula manual ---")
a, b = Q[0], E[0]
print("cos(numpy)  =", round(float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b))), 6))
print("cos(manual) =", round(cosine(list(a), list(b)), 6))
print("\n--- 2. ranking denso, BM25 e hibrido (RRF, k=60) ---")
bm = BM25(DOCS)
def rank_dense(i):
    s = (E @ Q[i]) / (np.linalg.norm(E, axis=1) * np.linalg.norm(Q[i]))
    return [ids[j] for j in np.argsort(-s)]
def rank_bm(q): return [i for i, _ in bm.top(q, len(DOCS))]
def rrf(*rs):
    sc = Counter()
    for r in rs:
        for pos, d in enumerate(r, 1): sc[d] += 1 / (60 + pos)
    return [d for d, _ in sorted(sc.items(), key=lambda x: (-x[1], x[0]))]
for nome, fn in (("BM25 (lexical)", lambda i: rank_bm(QA[i][0])), ("denso (embeddings)", rank_dense), ("hibrido RRF", lambda i: rrf(rank_bm(QA[i][0]), rank_dense(i)))):
    h1 = h3 = 0; M = 0
    for i, (q, gold, _) in enumerate(QA):
        r = fn(i); h1 += r[0] == gold; h3 += gold in r[:3]; M += mrr(r, {gold})
    print(f"{nome:20s} acerto@1={h1}/10 acerto@3={h3}/10 MRR={M/10:.3f}")
print("\n--- 3. consulta parafraseada (sem palavras em comum com o texto) ---")
pq = [("Quem pode usar o programa de apoio ao código sem pedir permissão?", "S01"),
      ("Quanto tempo posso levar para comunicar um problema com a IA?", "S05"),
      ("O robô pode mandar mensagem eletrônica sozinho?", "S07"),
      ("Quantas etapas o robô autônomo pode executar de uma vez?", "S08")]
PQ = np.array(list(m.embed([q for q, _ in pq])))
for i, (q, gold) in enumerate(pq):
    s = (E @ PQ[i]) / (np.linalg.norm(E, axis=1) * np.linalg.norm(PQ[i]))
    dense = [ids[j] for j in np.argsort(-s)][:1][0]
    lex = bm.top(q, 1)[0][0] if max(bm.score(q)) > 0 else "(sem termo em comum)"
    print(f"{q}\n   gabarito={gold} denso={dense} bm25={lex}")
