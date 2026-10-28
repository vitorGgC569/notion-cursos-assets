"""Pratica 2: engenharia de prompt medida: zero-shot x few-shot x formato; e raciocinio passo a passo."""
from lib import *
CAT = ["incidente", "requisicao", "duvida"]
T = [
 ("O sistema de protocolo está fora do ar desde as 9h.", "incidente"),
 ("Preciso de acesso à pasta da diretoria no servidor de arquivos.", "requisicao"),
 ("Como faço para trocar minha senha da rede?", "duvida"),
 ("A impressora do 3º andar parou de imprimir.", "incidente"),
 ("Solicito a instalação do LibreOffice no meu computador.", "requisicao"),
 ("Qual é o prazo para abrir um chamado de manutenção?", "duvida"),
 ("O e-mail institucional não está enviando mensagens.", "incidente"),
 ("Gostaria de um monitor adicional para minha estação.", "requisicao"),
 ("Existe um manual da VPN?", "duvida"),
 ("Não consigo entrar no sistema, aparece erro 500.", "incidente"),
 ("Por favor, criem uma conta para o novo estagiário.", "requisicao"),
 ("Onde encontro o formulário de solicitação de equipamento?", "duvida"),
]
SYS = "Você classifica chamados de TI em exatamente uma categoria: incidente, requisicao ou duvida. Responda apenas com a categoria, em minúsculas."
FEW = [("O servidor de arquivos está lento e travando.", "incidente"), ("Preciso de um novo token de acesso.", "requisicao"), ("Quem aprova a compra de licenças?", "duvida")]
def pred(msgs, estrito=True):
    r, _ = chat(msgs, max_tokens=6 if estrito else 60)
    r = norm(r)
    if estrito:
        for c in CAT:
            if r.startswith(c[:5]): return c
        return "?" + r[:10]
    # parser tolerante: primeira categoria citada no texto
    achados = sorted((r.find(c[:5]), c) for c in CAT if c[:5] in r)
    return achados[0][1] if achados else "?" + r[:10]
def acc(mode):
    ok = 0; rows = []
    for txt, gold in T:
        if mode == "zero":
            m = [{"role": "system", "content": SYS}, {"role": "user", "content": txt}]
        elif mode == "few":
            m = [{"role": "system", "content": SYS}]
            for a, b in FEW: m += [{"role": "user", "content": a}, {"role": "assistant", "content": b}]
            m += [{"role": "user", "content": txt}]
        else:  # sem instrucao de formato
            m = [{"role": "user", "content": "Classifique este chamado de TI (incidente, requisição ou dúvida): " + txt}]
        p = pred(m, estrito=(mode != "livre")); ok += p == gold; rows.append((txt[:38], gold, p))
    return ok, rows
res = {}
for mode, nome in (("livre", "sem papel e sem formato (parser tolerante: acha a categoria no texto)"), ("zero", "zero-shot com instrução e formato"), ("few", "few-shot (3 exemplos)")):
    ok, rows = acc(mode); res[mode] = ok
    print(f"[{nome}] acertos: {ok}/{len(T)} = {ok/len(T):.0%}")
    for r in rows:
        if r[1] != r[2]: print("   erro:", r)
print("\n--- raciocínio passo a passo (problemas aritméticos) ---")
P = [("Uma equipe revisa 14 pull requests por dia durante 5 dias e depois mais 9. Quantos revisou no total?", 79),
     ("Um repositório tem 120 arquivos; 25% são testes. Quantos arquivos são testes?", 30),
     ("Um agente gasta 450 tokens por passo e executa 6 passos. Quantos tokens no total?", 2700),
     ("Um prompt tem 1200 tokens e cada resposta 300. Em 4 chamadas, quantos tokens no total?", 6000),
     ("Um índice tem 480 trechos e cada consulta devolve 4. Quantos trechos em 25 consultas?", 100),
     ("Se 3 revisores analisam 12 mudanças em 2 dias, quantas mudanças 1 revisor analisa por dia?", 2)]
def num(s):
    import re
    n = re.findall(r"-?\d[\d\.]*", s.replace(".", "") if False else s)
    return n[-1].rstrip(".") if n else None
for nome, ins in (("direto (responda só com o número)", "Responda apenas com o número final."), ("passo a passo", "Raciocine passo a passo e termine com 'Resposta: <número>'.")):
    ok = 0; fechou = 0
    for q, g in P:
        r, u = chat([{"role": "user", "content": q + "\n" + ins}], max_tokens=300 if "passo" in nome else 12)
        got = num(r.split("Resposta:")[-1]) if "Resposta:" in r else num(r)
        ok += str(got) == str(g); fechou += "Resposta:" in r
        if "passo" in nome: print("   ->", q[:48], "| esperado", g, "| obtido", got, "| tokens", u["completion_tokens"])
    print(f"[{nome}] acertos: {ok}/{len(P)}" + (f" | terminaram com 'Resposta:': {fechou}/{len(P)}" if "passo" in nome else ""))
