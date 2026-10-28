#!/usr/bin/env python3
"""Monta e decodifica uma mensagem DNS 'na mao' (RFC 1035), sem rede: so para ver os campos."""
import struct, ipaddress

TIPOS = {1: "A", 2: "NS", 5: "CNAME", 15: "MX", 28: "AAAA"}

def nome_para_bytes(nome):
    return b"".join(bytes([len(p)]) + p.encode() for p in nome.split(".")) + b"\x00"

def consulta(nome, tipo, id_=0x1A2B):
    flags = 0x0100   # QR=0 (consulta), RD=1 (recursão desejada)
    cab = struct.pack(">HHHHHH", id_, flags, 1, 0, 0, 0)
    return cab + nome_para_bytes(nome) + struct.pack(">HH", tipo, 1)  # classe IN

def le_nome(msg, i):
    partes = []
    while True:
        n = msg[i]
        if n == 0: return ".".join(partes), i + 1
        if n & 0xC0 == 0xC0:  # ponteiro de compressão
            return ".".join(partes + [le_nome(msg, ((n & 0x3F) << 8) | msg[i + 1])[0]]), i + 2
        partes.append(msg[i + 1:i + 1 + n].decode()); i += 1 + n

def decodifica(msg):
    id_, fl, qd, an, ns, ar = struct.unpack(">HHHHHH", msg[:12])
    print(f"ID=0x{id_:04X}  QR={fl >> 15}  RD={(fl >> 8) & 1}  RA={(fl >> 7) & 1}  RCODE={fl & 0xF}  perguntas={qd} respostas={an}")
    i = 12
    for _ in range(qd):
        nome, i = le_nome(msg, i); t, c = struct.unpack(">HH", msg[i:i + 4]); i += 4
        print(f"  Pergunta : {nome} tipo {TIPOS.get(t, t)}")
    for _ in range(an):
        nome, i = le_nome(msg, i); t, c, ttl, rl = struct.unpack(">HHIH", msg[i:i + 10]); i += 10
        dado = msg[i:i + rl]; i += rl
        if t == 1: v = str(ipaddress.IPv4Address(dado))
        elif t == 28: v = str(ipaddress.IPv6Address(dado))
        elif t == 5: v = le_nome(msg, i - rl)[0]
        else: v = dado.hex()
        print(f"  Resposta : {nome} {TIPOS.get(t, t)} TTL={ttl}s -> {v}")

q = consulta("www.tce.go.gov.br", 1)
print("Consulta (A) em hexadecimal,", len(q), "bytes:\n ", q.hex(" "))
decodifica(q)

# resposta montada à mão para o exemplo (endereço de documentação, não é o do TCE-GO)
resp = bytearray(q); resp[2:4] = struct.pack(">H", 0x8180); resp[6:8] = struct.pack(">H", 1)
resp += b"\xC0\x0C" + struct.pack(">HHIH", 1, 1, 300, 4) + ipaddress.IPv4Address("203.0.113.10").packed
print("\nResposta (QR=1, RA=1) com um registro A:")
decodifica(bytes(resp))
print("\nConsulta AAAA:"); decodifica(consulta("www.tce.go.gov.br", 28))
print("\nOs rótulos do nome viram [tamanho][bytes]: ", nome_para_bytes("www.tce.go.gov.br"))
