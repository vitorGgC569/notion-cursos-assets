import math, re, unicodedata, json, time, os, sys
from collections import Counter
MODEL = os.environ.get("M9_MODEL", "/workspace/m9tools/models/qwen2.5-1.5b-instruct-q4_k_m.gguf")
_llm = None
def llm():
    global _llm
    if _llm is None:
        from llama_cpp import Llama
        _llm = Llama(MODEL, n_ctx=4096, n_threads=int(os.environ.get("M9_THREADS", "3")), seed=7, verbose=False)
    return _llm
def chat(messages, max_tokens=80, temperature=0.0, **kw):
    r = llm().create_chat_completion(messages=messages, max_tokens=max_tokens, temperature=temperature, **kw)
    return r["choices"][0]["message"]["content"].strip(), r["usage"]
def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")
STOP = set("a o as os de da do das dos e em um uma para por com que qual quais quantos quantas quantas e na no nas nos ao aos se sao ser tem tera ha pelo pela".split())
def toks(s):
    return [t for t in re.findall(r"[a-z0-9_\-]+", norm(s)) if t not in STOP]
def chunk_words(text, size, overlap):
    w = text.split()
    if len(w) <= size: return [" ".join(w)]
    step = size - overlap
    out = []
    for i in range(0, len(w), step):
        out.append(" ".join(w[i:i + size]))
        if i + size >= len(w): break
    return out
def n_chunks(n, size, overlap):
    if n <= size: return 1
    return math.ceil((n - overlap) / (size - overlap))
class BM25:
    def __init__(self, docs, k1=1.5, b=0.75):
        self.ids = list(docs); self.k1 = k1; self.b = b
        self.t = [toks(docs[i]) for i in self.ids]
        self.N = len(self.t); self.avg = sum(len(x) for x in self.t) / self.N
        df = Counter(w for x in self.t for w in set(x))
        self.idf = {w: math.log(1 + (self.N - n + 0.5) / (n + 0.5)) for w, n in df.items()}
        self.tf = [Counter(x) for x in self.t]
    def score(self, q):
        qs = toks(q); out = []
        for i, tf in enumerate(self.tf):
            L = len(self.t[i]); s = 0.0
            for w in qs:
                if w in tf:
                    s += self.idf[w] * tf[w] * (self.k1 + 1) / (tf[w] + self.k1 * (1 - self.b + self.b * L / self.avg))
            out.append(s)
        return out
    def top(self, q, k):
        sc = self.score(q)
        order = sorted(range(self.N), key=lambda i: (-sc[i], i))[:k]
        return [(self.ids[i], sc[i]) for i in order]
def cosine(a, b):
    num = sum(x * y for x, y in zip(a, b))
    return num / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))
def precision_at_k(ranked, rel, k):
    return sum(1 for r in ranked[:k] if r in rel) / k
def recall_at_k(ranked, rel, k):
    return sum(1 for r in ranked[:k] if r in rel) / len(rel)
def mrr(ranked, rel):
    for i, r in enumerate(ranked, 1):
        if r in rel: return 1 / i
    return 0.0
