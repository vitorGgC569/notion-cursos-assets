# L10. Conferencia Python x JavaScript das formulas do modulo (as mesmas do gerador de questoes do site)
import json, math, subprocess, os
def entropy_bits(l, a): return l * math.log2(a)
def keys_sym(n): return n * (n - 1) / 2
def keys_asym(n): return 2 * n
def ale(av, ef, aro): return av * ef * aro
def sle(av, ef): return av * ef
def downtime_hours(av): return (1 - av / 100) * 8760
def series_avail(a, b): return a * b / 100
def parallel_avail(a, b): return 100 - (100 - a) * (100 - b) / 100
def brute_years(bits, rate): return 2 ** (bits - 1) / rate / 31557600
def restore_sets(t, k): return 1 if t == "completo" else (1 + k if t == "incremental" else (2 if k >= 1 else 1))
def backup_bytes(t, F, d, k): return F * (k + 1) if t == "completo" else (F + d * k if t == "incremental" else F + d * k * (k + 1) / 2)
def hex_len(b): return b / 4
casos = {
 "entropyBits": [(8, 26), (8, 62), (12, 94), (4, 7776), (16, 10)],
 "keysSym": [(2,), (10,), (50,), (100,), (1000,)],
 "keysAsym": [(2,), (10,), (50,), (100,), (1000,)],
 "ale": [(500000, 0.4, 0.5), (800000, 0.25, 0.2), (6000, 1.0, 3.0), (120000, 0.3, 2)],
 "sle": [(500000, 0.4), (800000, 0.25), (6000, 1.0)],
 "downtimeHours": [(99,), (99.9,), (99.99,), (99.5,)],
 "seriesAvail": [(99, 99), (99.9, 99.5)],
 "parallelAvail": [(99, 99), (99.9, 99.5), (90, 90)],
 "bruteYears": [(40, 1e9), (56, 1e9), (64, 1e12), (128, 1e18)],
 "restoreSets": [("completo", 5), ("incremental", 5), ("diferencial", 5), ("diferencial", 0)],
 "backupBytes": [("completo", 100, 5, 6), ("incremental", 100, 5, 6), ("diferencial", 100, 5, 6)],
 "hexLen": [(128,), (160,), (256,), (512,)],
}
py = {"entropyBits": entropy_bits, "keysSym": keys_sym, "keysAsym": keys_asym, "ale": ale, "sle": sle, "downtimeHours": downtime_hours, "seriesAvail": series_avail, "parallelAvail": parallel_avail, "bruteYears": brute_years, "restoreSets": restore_sets, "backupBytes": backup_bytes, "hexLen": hex_len}
js = "const F=require('./fm10.js');const c=" + json.dumps(casos) + ";const o={};for(const k in c)o[k]=c[k].map(a=>F[k](...a));console.log(JSON.stringify(o));"
r = subprocess.run(["node", "-e", js], capture_output=True, text=True, cwd=os.path.dirname(os.path.abspath(__file__)))
jr = json.loads(r.stdout)
total = ok = 0
print(f"{'formula':15s} {'entrada':32s} {'Python':>22s} {'JavaScript':>22s}  igual?")
for k, lst in casos.items():
    for a, jv in zip(lst, jr[k]):
        pv = py[k](*a); total += 1
        igual = math.isclose(pv, jv, rel_tol=1e-12, abs_tol=1e-12); ok += igual
        print(f"{k:15s} {str(a):32s} {pv:>22.10g} {jv:>22.10g}  {'sim' if igual else 'NAO'}")
print(f"\n{ok} de {total} conferencias iguais")
