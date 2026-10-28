#!/usr/bin/env bash
# L5. PKI com openssl: CA propria, certificado do servidor, cadeia, expiracao, revogacao (CRL) e TLS local.
# Tudo num diretorio temporario do usuario. Nada e instalado no sistema nem em repositorios de confianca.
set -u
cd "$(dirname "$0")"
D=$(mktemp -d /tmp/m10l5_XXXXXX)
cd "$D"
echo "diretorio temporario: $D (apagado no fim)"
echo; echo "== 1. Autoridade certificadora (CA) propria: chave e certificado autoassinado =="
openssl ecparam -name prime256v1 -genkey -noout -out ca.key 2>/dev/null
openssl req -x509 -new -key ca.key -sha256 -days 3650 -subj "/C=BR/O=Curso TCE-GO TI/CN=CA Raiz do Curso" \
  -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,keyCertSign,cRLSign" -out ca.crt
openssl x509 -in ca.crt -noout -subject -issuer -ext basicConstraints,keyUsage | sed 's/^/  /'
echo "  (subject == issuer: certificado autoassinado, raiz da cadeia)"
echo; echo "== 2. Certificado do servidor: CSR assinada pela CA, com SAN =="
openssl ecparam -name prime256v1 -genkey -noout -out servidor.key 2>/dev/null
openssl req -new -key servidor.key -subj "/C=BR/O=Curso TCE-GO TI/CN=localhost" -out servidor.csr
cat > ext.cnf <<X
basicConstraints=CA:FALSE
keyUsage=critical,digitalSignature
extendedKeyUsage=serverAuth
subjectAltName=DNS:localhost,IP:127.0.0.1
X
openssl x509 -req -in servidor.csr -CA ca.crt -CAkey ca.key -CAcreateserial -days 90 -sha256 -extfile ext.cnf -out servidor.crt 2>&1 | sed 's/^/  /'
openssl x509 -in servidor.crt -noout -subject -issuer -serial -dates -ext subjectAltName,basicConstraints,extendedKeyUsage | sed 's/^/  /'
echo; echo "== 3. Validacao da cadeia =="
echo '$ openssl verify -CAfile ca.crt servidor.crt'; openssl verify -CAfile ca.crt servidor.crt 2>&1
echo '$ openssl verify servidor.crt   (sem informar a CA)'; openssl verify servidor.crt 2>&1 | sed 's/^/  /'
echo; echo "== 4. Certificado vencido: verificacao numa data futura (-attime) =="
FUT=$(( $(date +%s) + 200*86400 ))
echo '$ openssl verify -attime <hoje + 200 dias> -CAfile ca.crt servidor.crt'; openssl verify -attime $FUT -CAfile ca.crt servidor.crt 2>&1 | sed 's/^/  /'
echo; echo "== 5. Adulteracao: trocar uma letra do nome (localhost -> mocalhost) quebra a assinatura da CA =="
cp servidor.crt adulterado.crt
python3 - <<'P'
import re,base64
s=open('adulterado.crt').read()
b=re.search(r'-----BEGIN CERTIFICATE-----(.*?)-----END CERTIFICATE-----',s,re.S).group(1)
der=bytearray(base64.b64decode(b))
i=der.find(b'localhost'); der[i]=ord('m')
n=base64.b64encode(bytes(der)).decode()
open('adulterado.crt','w').write('-----BEGIN CERTIFICATE-----\n'+'\n'.join(n[j:j+64] for j in range(0,len(n),64))+'\n-----END CERTIFICATE-----\n')
P
openssl x509 -in adulterado.crt -noout -subject | sed 's/^/  /'
openssl verify -CAfile ca.crt adulterado.crt 2>&1 | sed 's/^/  /'
echo; echo "== 6. Revogacao: CRL (lista de certificados revogados) =="
mkdir -p ca_db; : > ca_db/index.txt; echo 1000 > ca_db/serial; echo 1000 > ca_db/crlnumber
cat > ca.cnf <<X
[ca]
default_ca=CA_default
[CA_default]
dir=$D/ca_db
database=\$dir/index.txt
new_certs_dir=\$dir
serial=\$dir/serial
crlnumber=\$dir/crlnumber
default_md=sha256
default_crl_days=7
policy=pol
private_key=$D/ca.key
certificate=$D/ca.crt
[pol]
commonName=supplied
X
openssl ecparam -name prime256v1 -genkey -noout -out user.key 2>/dev/null
openssl req -new -key user.key -subj "/CN=servidor revogavel" -out user.csr
openssl ca -config ca.cnf -batch -notext -in user.csr -out user.crt -days 30 -extfile ext.cnf 2>&1 | sed 's/^/  /' | grep -E "Certificate Details|Serial|Not|Data Base" | head -3
echo '$ openssl verify -CAfile ca.crt user.crt   (antes da revogacao)'; openssl verify -CAfile ca.crt user.crt 2>&1 | sed 's/^/  /'
openssl ca -config ca.cnf -revoke user.crt -crl_reason keyCompromise 2>&1 | sed 's/^/  /' | tail -1
openssl ca -config ca.cnf -gencrl -out ca.crl 2>/dev/null
openssl crl -in ca.crl -noout -issuer -lastupdate -nextupdate | sed 's/^/  /'
openssl crl -in ca.crl -noout -text | grep -E "Serial Number|Revocation Date|Key Compromise" | sed 's/^/  /'
cat ca.crt ca.crl > ca_crl.pem
echo '$ openssl verify -crl_check -CAfile ca_crl.pem user.crt   (depois da revogacao)'; openssl verify -crl_check -CAfile ca_crl.pem user.crt 2>&1 | sed 's/^/  /'
echo '$ openssl verify -crl_check -CAfile ca_crl.pem servidor.crt   (certificado nao revogado)'; openssl verify -crl_check -CAfile ca_crl.pem servidor.crt 2>&1 | sed 's/^/  /'
echo; echo "== 7. Handshake TLS real em 127.0.0.1 (Python, modulo ssl) =="
python3 -u "$OLDPWD/l05_tls_local.py" "$D"
cd /tmp && rm -rf "$D" && echo "diretorio temporario apagado"
