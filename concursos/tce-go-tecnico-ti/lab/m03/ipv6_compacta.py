#!/usr/bin/env python3
"""Compacta, expande e classifica enderecos IPv6 (biblioteca padrao)."""
import ipaddress

def tipo(a):
    if a.is_loopback: return "loopback (::1)"
    if a.is_link_local: return "link-local (fe80::/10)"
    if a.is_multicast: return "multicast (ff00::/8)"
    if a.is_unspecified: return "não especificado (::)"
    if a in ipaddress.ip_network("fc00::/7"): return "unique local (fc00::/7), equivale ao IPv4 privado"
    if a in ipaddress.ip_network("2000::/3"): return "unicast global (2000::/3)"
    return "outro"

def passo(txt):
    a = ipaddress.IPv6Address(txt)
    print(f"Original  : {txt}")
    print(f"Expandido : {a.exploded}")
    print(f"Compacto  : {a.compressed}")
    print(f"Tipo      : {tipo(a)}\n")

passo("2804:aaaa:0000:00ab:0000:0000:0000:1111")   # questão TRT-5 2022
for e in ("fe80::1", "::1", "ff02::1", "fd00:0:0:1::10", "2001:db8::"):
    passo(e)
rede = ipaddress.IPv6Network("2804:aaaa:0:ab::/64")
print(f"Uma sub-rede /64 tem 2^64 = {rede.num_addresses:,} endereços".replace(",", "."))
print("Por isso o IPv6 não tem broadcast: usa multicast (ff02::1 = todos os nós do enlace).")
