"""Pratica 3: RAG do zero, parte 1: chunking e recuperacao BM25, com metricas. Sem modelo de linguagem."""
from lib import *
from corpus import DOCS, QA
print("corpus:", len(DOCS), "secoes,", sum(len(v.split()) for v in DOCS.values()), "palavras no total")
print("\n--- 1. numero de trechos: formula x codigo ---")
for n, size, ov in ((1000, 120, 20), (3000, 120, 20), (500, 100, 0), (95, 100, 10)):
    fake = " ".join(f"w{i}" for i in range(n))
    print(f"N={n:5d} tamanho={size} sobreposicao={ov:2d} -> codigo={len(chunk_words(fake, size, ov)):3d} formula={n_chunks(n, size, ov):3d}")
print("\n--- 2. indice por secao e consulta ---")
bm = BM25(DOCS)
for q, gold, _ in QA[:4]:
    top = bm.top(q, 3)
    print(f"P: {q}\n   gabarito={gold} top3={[(i, round(s, 2)) for i, s in top]}")
print("\n--- 3. metricas por k (10 perguntas, 1 secao relevante cada) ---")
for k in (1, 2, 3, 5):
    P = R = M = 0
    for q, gold, _ in QA:
        ranked = [i for i, _ in bm.top(q, len(DOCS))]
        P += precision_at_k(ranked, {gold}, k); R += recall_at_k(ranked, {gold}, k); M += mrr(ranked, {gold})
    n = len(QA)
    print(f"k={k}: precisao@k={P/n:.3f} revocacao@k={R/n:.3f} MRR={M/n:.3f}")
print("\n--- 4. tamanho do trecho: trechos maiores diluem o sinal? ---")
# junta todas as secoes em um unico texto e fatia com tamanhos diferentes; relevante = trecho que contem a palavra-resposta
full = " ".join(DOCS[k] for k in sorted(DOCS))
for size, ov in ((20, 0), (40, 5), (80, 10), (160, 20), (320, 40)):
    ch = {f"c{i}": t for i, t in enumerate(chunk_words(full, size, ov))}
    b = BM25(ch); hit = 0; chars = 0
    for q, gold, ans in QA:
        top = b.top(q, 2)
        ids = [i for i, _ in top]
        # acerto: algum dos 2 trechos recuperados contem a secao de gabarito (artigo certo)
        art = "art. " + str(int(gold[1:])) + "."
        hit += any(art in ch[i] for i in ids)
        chars += sum(len(ch[i].split()) for i in ids)
    print(f"tamanho={size:3d} sobreposicao={ov:2d} trechos={len(ch):3d} acerto@2={hit}/10 palavras de contexto medias={chars/10:.0f}")
