# L3. Criptografia simetrica: AES-GCM, vazamento de padroes do ECB e reuso de nonce
import os, subprocess, tempfile
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.exceptions import InvalidTag
print("== 1. AES-256-GCM: cifra e autentica ==")
chave = bytes(range(32)); nonce = bytes(range(12))
aes = AESGCM(chave)
pt = b"Parecer sigiloso do processo 2026/001"
ct = aes.encrypt(nonce, pt, b"cab:v1")
print("chave:", len(chave)*8, "bits | nonce:", len(nonce)*8, "bits")
print("texto claro:", len(pt), "bytes | cifrado+tag:", len(ct), "bytes (tag de 16 bytes)")
print("decifra ok :", aes.decrypt(nonce, ct, b"cab:v1").decode())
adulterado = bytearray(ct); adulterado[3] ^= 1
try:
    aes.decrypt(nonce, bytes(adulterado), b"cab:v1")
except InvalidTag:
    print("1 bit alterado no cifrado -> InvalidTag (integridade e autenticidade verificadas)")
try:
    aes.decrypt(nonce, ct, b"cab:v2")
except InvalidTag:
    print("dado associado diferente  -> InvalidTag")
print("\n== 2. ECB revela padroes; GCM nao ==")
bloco = b"BLOCO-IGUAL-16B!"
dados = bloco * 4 + os.urandom(16) + bloco * 4
def blocos(b): return [b[i:i+16] for i in range(0, len(b), 16)]
def repetidos(b):
    bs = blocos(b); return len(bs) - len(set(bs))
ecb = Cipher(algorithms.AES(chave), modes.ECB()).encryptor().update(dados)
cbc = Cipher(algorithms.AES(chave), modes.CBC(bytes(16))).encryptor().update(dados)
gcm = AESGCM(chave).encrypt(nonce, dados, None)
print(f"entrada: {len(blocos(dados))} blocos de 16 bytes, {repetidos(dados)} blocos repetidos")
print(f"ECB : {repetidos(ecb)} blocos cifrados repetidos  <- o padrao vaza")
print(f"CBC : {repetidos(cbc)} blocos cifrados repetidos")
print(f"GCM : {repetidos(gcm[:-16])} blocos cifrados repetidos")
print("\n== 3. Reusar o nonce no modo de fluxo (CTR/GCM) destroi o sigilo ==")
p1 = b"Salario do servidor A: 12000"
p2 = b"Salario do servidor B: 98000"
c1 = AESGCM(chave).encrypt(nonce, p1, None)[:-16]
c2 = AESGCM(chave).encrypt(nonce, p2, None)[:-16]
xor_c = bytes(a ^ b for a, b in zip(c1, c2))
xor_p = bytes(a ^ b for a, b in zip(p1, p2))
print("c1 XOR c2 == p1 XOR p2 ?", xor_c == xor_p, "(o atacante nao precisa da chave para obter p1 XOR p2)")
print("com p1 conhecido, o atacante recupera p2:", bytes(a ^ b for a, b in zip(xor_c, p1)).decode())
print("\n== 4. openssl enc (CLI) com derivacao de chave PBKDF2 ==")
d = tempfile.mkdtemp(prefix="m10l3_")
open(d + "/a.txt", "w").write("conteudo confidencial\n")
def sh(cmd): return subprocess.run(cmd, shell=True, capture_output=True, text=True, errors="replace")
sh(f"openssl enc -aes-256-cbc -pbkdf2 -iter 100000 -salt -pass pass:SenhaDeTeste -in {d}/a.txt -out {d}/a.enc")
print("arquivo cifrado comeca com:", open(d + "/a.enc", "rb").read(8))
print("decifrado :", sh(f"openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:SenhaDeTeste -in {d}/a.enc").stdout.strip())
r = sh(f"openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -pass pass:senhaerrada -in {d}/a.enc")
print("senha errada ->", r.stderr.strip().splitlines()[-1] if r.stderr.strip() else "sem erro")
