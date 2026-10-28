"""Gabarito das práticas de papel do Módulo 3: tudo calculado com a biblioteca padrão."""
import ipaddress as ip, math
print("== Prática A: sub-rede de cada endereço ==")
for a in ["10.20.30.77/27","192.168.5.200/26","172.16.45.9/20","200.10.10.130/25"]:
    i=ip.ip_interface(a); n=i.network
    h=list(n.hosts())
    print(f"{a:20} máscara {n.netmask}  rede {n.network_address}  broadcast {n.broadcast_address}  hosts {h[0]} a {h[-1]} ({len(h)})")
print()
print("== Prática B: VLSM a partir de 192.168.10.0/24 (maior demanda primeiro) ==")
dem=[("Administrativo",100),("Auditoria",50),("TI",25),("Enlace",2)]
cur=ip.ip_address("192.168.10.0")
for nome,qtd in dem:
    bits=math.ceil(math.log2(qtd+2)); pref=32-bits
    net=ip.ip_network(f"{cur}/{pref}")
    print(f"{nome:15} precisa {qtd:3} hosts -> /{pref} ({net.num_addresses} endereços)  {net}  úteis {net.network_address+1} a {net.broadcast_address-1}")
    cur=net.broadcast_address+1
print(f"próximo endereço livre: {cur}")
print()
print("== Prática C: IPv6 ==")
for a in ["2001:0db8:0000:0000:0000:0000:0000:0001","2001:0db8:0000:00a0:0000:0000:0000:0001","fe80:0000:0000:0000:0202:b3ff:fe1e:8329"]:
    x=ip.IPv6Address(a); print(a,"->",x.compressed)
print()
print("== Prática D: RAID (4 discos de 2 TB) ==")
d=2
print(f"RAID 0 : {4*d} TB úteis, tolera 0 falhas garantidas")
print(f"RAID 1 : {d} TB úteis (espelho completo), sobrevive com 1 disco")
print(f"RAID 5 : {(4-1)*d} TB úteis, tolera 1 falha")
print(f"RAID 6 : {(4-2)*d} TB úteis, tolera 2 falhas")
print(f"RAID 10: {4*d//2} TB úteis, tolera 1 falha por espelho (até 2 se em espelhos diferentes)")
