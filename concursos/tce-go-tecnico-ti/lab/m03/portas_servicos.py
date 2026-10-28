#!/usr/bin/env python3
"""Mostra as portas conhecidas que mais caem, consultando a tabela de servicos do proprio sistema (/etc/services)."""
import socket
lista = [(20,"tcp","FTP dados"),(21,"tcp","FTP controle"),(22,"tcp","SSH"),(23,"tcp","Telnet"),(25,"tcp","SMTP"),(53,"udp","DNS"),
         (67,"udp","DHCP servidor"),(68,"udp","DHCP cliente"),(80,"tcp","HTTP"),(110,"tcp","POP3"),(123,"udp","NTP"),(143,"tcp","IMAP"),
         (161,"udp","SNMP"),(389,"tcp","LDAP"),(443,"tcp","HTTPS"),(465,"tcp","SMTPS"),(587,"tcp","SMTP submissão"),(636,"tcp","LDAPS"),
         (993,"tcp","IMAPS"),(995,"tcp","POP3S"),(3389,"tcp","RDP")]
print(f"{'Porta':7}{'Proto':7}{'Nome local':14}{'Serviço (curso)'}")
for p, pr, nome in lista:
    try: loc = socket.getservbyport(p, pr)
    except OSError: loc = "(não consta)"
    print(f"{p:<7}{pr:<7}{loc:14}{nome}")
print("\nObservação: a coluna 'Nome local' vem do arquivo /etc/services desta máquina. A coluna do curso é o que a prova espera.")
