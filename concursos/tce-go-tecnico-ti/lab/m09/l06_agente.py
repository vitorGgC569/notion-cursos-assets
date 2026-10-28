"""Pratica 6: laco de agente (percepcao-raciocinio-acao) escrito do zero.
Parte A: politica ROTEIRIZADA (mostra a mecanica do laco, sem modelo; deterministica).
Parte B: politica = LLM local pequeno com chamada de ferramenta em JSON (resultado real, nao representativo de modelos grandes)."""
from lib import *
from corpus import DOCS
bm = BM25(DOCS)
def t_calcular(expr):
    if not re.fullmatch(r"[0-9\.\+\-\*/\(\) ]+", expr): return "ERRO: expressão não permitida"
    return str(eval(expr, {"__builtins__": {}}, {}))
def t_buscar(consulta):
    i, _ = bm.top(consulta, 1)[0]; return DOCS[i]
TOOLS = {"calcular": t_calcular, "buscar_norma": t_buscar}
MAX = 6
def run(policy, task, label):
    hist = []; print(f"\n=== {label} | tarefa: {task}")
    for step in range(1, MAX + 1):
        act = policy(task, hist)
        if act.get("tool") == "final":
            print(f"passo {step}: FINAL -> {act['arg']}"); return act["arg"], step
        if act.get("tool") not in TOOLS:
            obs = "ERRO: ferramenta fora da lista de permissão"
        else:
            try: obs = TOOLS[act["tool"]](act["arg"])
            except Exception as e: obs = "ERRO: " + str(e)[:60]
        print(f"passo {step}: ACAO {act['tool']}({act['arg']!r}) -> OBS {obs[:70]!r}")
        hist.append((act, obs))
    print(f"limite de {MAX} passos atingido: o agente para e devolve o estado"); return None, MAX
def roteiro(task, hist):
    s = [{"tool": "buscar_norma", "arg": "limite de passos por execução de um agente"}, {"tool": "calcular", "arg": "6 * 450"}, {"tool": "final", "arg": "6 passos; 6*450 = 2700 tokens"}]
    return s[len(hist)] if len(hist) < len(s) else {"tool": "final", "arg": "?"}
def preso(task, hist): return {"tool": "calcular", "arg": "1+1"}
def maldoso(task, hist): return {"tool": "apagar_repositorio", "arg": "/"} if not hist else {"tool": "final", "arg": "bloqueado"}
print("PARTE A: politicas roteirizadas (sem modelo)")
run(roteiro, "descobrir o limite de passos e calcular 6 x 450 tokens", "roteirizado")
run(preso, "tarefa sem fim", "laco infinito contido pelo limite")
run(maldoso, "tentativa de ferramenta nao permitida", "lista de permissão")
print("\nPARTE B: politica = LLM local (JSON). Mesmas tarefas, tres configuracoes")
SYS1 = ('Você é um agente. A cada passo responda SOMENTE com um JSON: {"tool": "...", "arg": "..."}.\n'
        'Ferramentas: calcular (arg = expressão aritmética), buscar_norma (arg = consulta em texto), final (arg = resposta final).')
SYS2 = SYS1 + ('\nRegras: (1) use buscar_norma para fatos da norma interna e calcular só para contas; (2) quando a OBSERVAÇÃO já contém a resposta, '
        'responda IMEDIATAMENTE com final, citando o valor da observação; (3) nunca repita a mesma ferramenta com o mesmo argumento.\n'
        'Exemplo: tarefa "quanto é 2+3?" -> {"tool": "calcular", "arg": "2+3"}; observação "5" -> {"tool": "final", "arg": "5"}.')
def mk_policy(sys_msg, guard=False):
    def pol(task, hist):
        if guard and len(hist) >= 2 and hist[-1][0] == hist[-2][0]:
            return {"tool": "final", "arg": "[GUARDA] repeticao detectada; ultimo resultado: " + hist[-1][1][:90]}
        msgs = [{"role": "system", "content": sys_msg}, {"role": "user", "content": task}]
        for a, o in hist:
            msgs += [{"role": "assistant", "content": json.dumps(a, ensure_ascii=False)}, {"role": "user", "content": "OBSERVAÇÃO: " + o}]
        r, _ = chat(msgs, max_tokens=70)
        m = re.search(r"\{.*?\}", r, re.S)
        try: return json.loads(m.group(0))
        except Exception: return {"tool": "invalido", "arg": r[:40]}
    return pol
tarefas = [("Qual é o limite de passos de um agente na norma? Responda só o número.", "6"),
           ("Quanto é 15% de 2400? Use a ferramenta calcular.", "360"),
           ("Quantas horas tem o treinamento obrigatório de IA? Consulte a norma.", "4"),
           ("Qual é a cobertura mínima de testes exigida para aceitar um pull request? Consulte a norma.", "75"),
           ("Quanto é 6 vezes 450? Use a ferramenta calcular.", "2700")]
for nome, pol in (("A) prompt basico", mk_policy(SYS1)), ("B) prompt com regras e exemplo", mk_policy(SYS2)), ("C) regras + guarda contra repeticao", mk_policy(SYS2, True))):
    print("\n##### configuracao", nome)
    ok = 0
    for t, g in tarefas:
        ans, n = run(pol, t, "LLM"); good = ans is not None and re.search(r"(?<![0-9.,])" + g + r"(?![0-9])", str(ans)) is not None; ok += good
        print(f"   esperado {g!r}: {'OK' if good else 'FALHOU'} (passos usados: {n})")
    print(f"=> {nome}: {ok}/{len(tarefas)} tarefas corretas")
