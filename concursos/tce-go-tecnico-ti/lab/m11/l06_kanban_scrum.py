# L6. Fluxo de trabalho: Lei de Little, metricas de Kanban e previsao com velocidade do Scrum
import random, statistics
rnd = random.Random(5)
print("== 1. Simulacao de um quadro Kanban (400 dias, entrada media 1,0 item/dia, capacidade de saida media 1,1 item/dia) ==")
fila = []; concluidos = []; wip_dia = []; t_ent = 0
for dia in range(400):
    for _ in range(sum(1 for _ in range(2) if rnd.random() < .5)): fila.append(dia)
    for _ in range(sum(1 for _ in range(2) if rnd.random() < .55)):
        if fila: concluidos.append((fila.pop(0), dia))
    wip_dia.append(len(fila))
lead = [f - i for i, f in concluidos]
lam = len(concluidos) / 400; W = statistics.mean(lead); L = statistics.mean(wip_dia)
print(f"concluidos = {len(concluidos)} | vazao = {lam:.3f} itens/dia | lead time medio = {W:.2f} dias | WIP medio = {L:.2f}")
print(f"Lei de Little: L = lambda x W = {lam:.3f} x {W:.2f} = {lam*W:.2f}  (WIP medio medido = {L:.2f})")
print("A igualdade vale aproximadamente: itens ainda na fila no ultimo dia nao entram no lead time medido.")
print("\n== 2. Percentis de lead time (para prometer prazo) ==")
ls = sorted(lead); p = lambda q: ls[min(len(ls) - 1, int(q * len(ls)))]
print(f"P50 = {p(.5)} dias | P85 = {p(.85)} dias | P95 = {p(.95)} dias | maximo = {ls[-1]} dias")
print("\n== 3. Efeito de limitar o WIP: mesma vazao, menos espera (formula de Little) ==")
for wip in [20, 10, 5, 3]:
    print(f"WIP = {wip:>2} com vazao {lam:.2f}/dia -> lead time medio = {wip/lam:6.1f} dias")
print("\n== 4. Scrum: velocidade e previsao ==")
vel = [21, 18, 24, 20, 23, 19]; backlog = 150
m = statistics.mean(vel); dp = statistics.pstdev(vel)
print(f"velocidade das 6 sprints = {vel} | media = {m:.2f} | desvio-padrao = {dp:.2f}")
print(f"backlog restante = {backlog} pontos -> sprints previstas = {backlog/m:.2f} (otimista {backlog/(m+dp):.2f}, pessimista {backlog/(m-dp):.2f})")
print("Previsao em intervalo, nao em numero unico: velocidade e historico, nao meta.")
