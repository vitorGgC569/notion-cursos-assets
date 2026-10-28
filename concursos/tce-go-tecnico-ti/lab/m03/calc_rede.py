#!/usr/bin/env python3
"""Calculadora didatica de sub-redes IPv4 (usa so a biblioteca padrao)."""
import ipaddress

def mostra(cidr):
    r = ipaddress.ip_interface(cidr).network
    ip = ipaddress.ip_interface(cidr).ip
    hosts = list(r.hosts())
    print(f"Endereço       : {ip}")
    print(f"Prefixo / Máscara: /{r.prefixlen} = {r.netmask}")
    print(f"Tamanho do bloco : {r.num_addresses} endereços ({r.num_addresses - 2} úteis)")
    print(f"Rede             : {r.network_address}")
    print(f"Primeiro válido  : {hosts[0]}")
    print(f"Último válido    : {hosts[-1]}")
    print(f"Broadcast        : {r.broadcast_address}")
    print()

def prefixo_pela_faixa(primeiro, ultimo):
    """Dado o primeiro e o ultimo enderecos validos, descobre o menor prefixo que os contem como uteis."""
    a, b = ipaddress.ip_address(primeiro), ipaddress.ip_address(ultimo)
    for p in range(30, 0, -1):
        r = ipaddress.ip_network(f"{a}/{p}", strict=False)
        h = list(r.hosts())
        if h[0] == a and h[-1] == b:
            return r
    return None

print("== Questão TRT-5 2022: 172.18.10.70/26 ==")
mostra("172.18.10.70/26")
print("== Questão TRT-14 2022: primeiro 192.168.14.33 e último 192.168.14.62 ==")
r = prefixo_pela_faixa("192.168.14.33", "192.168.14.62")
print(f"Rede {r}, máscara {r.netmask}\n")
print("== Dividir 192.168.10.0/24 em 4 sub-redes iguais ==")
for s in ipaddress.ip_network("192.168.10.0/24").subnets(prefixlen_diff=2):
    h = list(s.hosts())
    print(f"{str(s):18} úteis {h[0]} a {h[-1]}  broadcast {s.broadcast_address}")
print()
print("== Tabela de prefixos que mais caem ==")
print(f"{'Prefixo':8}{'Máscara':18}{'Bloco':7}{'Úteis':7}")
for p in (24, 25, 26, 27, 28, 29, 30):
    n = ipaddress.ip_network(f"10.0.0.0/{p}")
    print(f"/{p:<7}{str(n.netmask):18}{n.num_addresses:<7}{n.num_addresses - 2:<7}")
