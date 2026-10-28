# L4. Criptografia assimetrica: RSA, Ed25519, ECDH e envelope hibrido
import os, time
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ed25519, x25519
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.exceptions import InvalidSignature
print("== 1. RSA: tamanho do modulo (a chave pode superar 1024 bits) ==")
chaves = {}
for bits in (1024, 2048, 3072):
    t = time.perf_counter(); k = rsa.generate_private_key(public_exponent=65537, key_size=bits); dt = time.perf_counter() - t
    chaves[bits] = k
    print(f"RSA-{bits}: modulo n com {k.public_key().public_numbers().n.bit_length()} bits, expoente publico e = {k.public_key().public_numbers().e}, geracao {dt*1000:.0f} ms (varia)")
k = chaves[2048]; pub = k.public_key()
print("\n== 2. RSA-OAEP cifra com a PUBLICA; so a PRIVADA decifra (confidencialidade) ==")
msg = b"chave de sessao de 32 bytes......."
oaep = padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
ct = pub.encrypt(msg, oaep)
print("cifrado tem", len(ct), "bytes (= tamanho do modulo)")
print("decifrado com a privada:", k.decrypt(ct, oaep) == msg)
print("limite do RSA-2048 com OAEP-SHA256:", 256 - 2*32 - 2, "bytes por operacao")
try:
    pub.encrypt(b"x" * 300, oaep)
except ValueError as e:
    print("mensagem de 300 bytes ->", e)
print("\n== 3. Assinatura: PRIVADA assina, PUBLICA verifica (autenticidade, integridade, nao repudio) ==")
doc = b"Parecer 2026/17: aprovado"
pss = padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH)
sig = k.sign(doc, pss, hashes.SHA256())
print("assinatura RSA-PSS:", len(sig), "bytes")
pub.verify(sig, doc, pss, hashes.SHA256()); print("verificacao do documento original: valida")
try:
    pub.verify(sig, doc + b"!", pss, hashes.SHA256())
except InvalidSignature:
    print("documento alterado em 1 byte: assinatura INVALIDA")
outra = rsa.generate_private_key(public_exponent=65537, key_size=2048)
try:
    outra.public_key().verify(sig, doc, pss, hashes.SHA256())
except InvalidSignature:
    print("verificar com a chave publica de outra pessoa: INVALIDA")
print("\n== 4. Ed25519: assinatura curta, chaves de 32 bytes ==")
ek = ed25519.Ed25519PrivateKey.generate()
raw = lambda x, f=serialization.PublicFormat.Raw: x.public_bytes(serialization.Encoding.Raw, f)
es = ek.sign(doc)
print("chave publica:", len(raw(ek.public_key())), "bytes | assinatura:", len(es), "bytes")
ek.public_key().verify(es, doc); print("verificacao ok")
print("\n== 5. ECDH (X25519): duas partes chegam ao MESMO segredo sem enviá-lo ==")
a = x25519.X25519PrivateKey.generate(); b = x25519.X25519PrivateKey.generate()
sa = a.exchange(b.public_key()); sb = b.exchange(a.public_key())
print("segredo de A == segredo de B ?", sa == sb, "| tamanho:", len(sa), "bytes")
ka = HKDF(hashes.SHA256(), 32, None, b"m10-sessao").derive(sa)
print("chave de sessao derivada (HKDF) com", len(ka)*8, "bits")
print("\n== 6. Envelope hibrido: AES-GCM para os dados e RSA-OAEP para a chave ==")
dados = os.urandom(1_000_000)
ks = AESGCM.generate_key(256); n = os.urandom(12)
t = time.perf_counter(); cd = AESGCM(ks).encrypt(n, dados, None); t_aes = time.perf_counter() - t
ck = pub.encrypt(ks, oaep)
print(f"dados de 1.000.000 bytes cifrados com AES-GCM em {t_aes*1000:.1f} ms; chave de 32 bytes cifrada com RSA em {len(ck)} bytes")
ks2 = k.decrypt(ck, oaep)
print("destinatario recupera a chave e os dados:", AESGCM(ks2).decrypt(n, cd, None) == dados)
print("\n== 7. Numero de chaves para n pessoas ==")
print(f"{'n':>6} {'simetrica n(n-1)/2':>20} {'assimetrica 2n':>16}")
for n_ in (2, 10, 50, 100, 1000):
    print(f"{n_:>6} {n_*(n_-1)//2:>20} {2*n_:>16}")
