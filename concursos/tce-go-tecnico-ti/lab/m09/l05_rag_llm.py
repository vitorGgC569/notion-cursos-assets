"""Pratica 5: RAG completo com LLM local: resposta sem contexto x com contexto recuperado."""
from lib import *
from corpus import DOCS, QA
bm = BM25(DOCS)
SYS = "Responda em português, em uma frase curta, usando SOMENTE o contexto. Se o contexto não tiver a resposta, diga exatamente: Não encontrei essa informação."
def rag_msgs(q, k):
    ctx = "\n".join(f"[{i}] {DOCS[i]}" for i, _ in bm.top(q, k))
    return [{"role": "system", "content": SYS}, {"role": "user", "content": f"CONTEXTO:\n{ctx}\n\nPERGUNTA: {q}"}], ctx
def ok(ans, exp): return norm(exp) in norm(ans)
res = {"sem": 0, "k1": 0, "k3": 0}; toks_in = {"k1": 0, "k3": 0}
for q, gold, exp in QA:
    a0, _ = chat([{"role": "user", "content": q + " Responda em uma frase."}], max_tokens=50)
    m1, _ = rag_msgs(q, 1); a1, u1 = chat(m1, max_tokens=50)
    m3, _ = rag_msgs(q, 3); a3, u3 = chat(m3, max_tokens=50)
    res["sem"] += ok(a0, exp); res["k1"] += ok(a1, exp); res["k3"] += ok(a3, exp)
    toks_in["k1"] += u1["prompt_tokens"]; toks_in["k3"] += u3["prompt_tokens"]
    print(f"P: {q}\n  esperado contém: {exp!r}\n  sem RAG : {a0[:90]!r}\n  RAG k=1 : {a1[:90]!r}\n  RAG k=3 : {a3[:90]!r}")
print("\nacertos (resposta contém o valor esperado):")
print(f"  sem recuperacao : {res['sem']}/10")
print(f"  RAG k=1         : {res['k1']}/10 | tokens de entrada medios = {toks_in['k1']/10:.0f}")
print(f"  RAG k=3         : {res['k3']}/10 | tokens de entrada medios = {toks_in['k3']/10:.0f}")
print("\n--- pergunta sem resposta no corpus (abstencao) ---")
for q in ("Qual é a cor do prédio do Tribunal?", "Quantas ferramentas MCP o Atlas oferece em 2027?"):
    m, _ = rag_msgs(q, 3); a, _ = chat(m, max_tokens=40)
    print(f"P: {q}\n  RAG k=3: {a!r}")
