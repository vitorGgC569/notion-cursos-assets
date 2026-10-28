# Roteiro para usar no NotebookLM (Módulo 10: Segurança da Informação)

Passo a passo para montar o caderno pelo navegador. Os links finais devem ser colados na seção "NotebookLM" da página do módulo no Notion.

## 1. Montar o caderno
1. Crie um caderno novo com o nome "TCE-GO TI, Módulo 10: Segurança da Informação".
2. Em Fontes, envie os arquivos desta pasta: 01-resumo-teorico.md, 03-questoes-reais-comentadas.md e 04-simulado-autoral.md (se o NotebookLM não aceitar .md, use o 01-resumo-teorico.pdf ou cole o texto).
3. Adicione as URLs do arquivo 02-urls-publicas.md como fontes de Site ou YouTube. Comece pelo OWASP Top 10:2025, pelo NIST SP 800-207 (Zero Trust), pelas RFCs de TLS e de certificados, pela Cartilha do CERT.br e pelas 6 videoaulas.

## 2. Resumo em áudio (Audio Overview)
Instrução sugerida para personalizar: "Faça uma conversa em português do Brasil, para quem estuda para o concurso do TCE-GO (banca FCC, cargo Técnico de Controle Externo, TI). Foque em segurança da informação: confidencialidade, integridade, disponibilidade, autenticidade e não repúdio; riscos (SLE e ALE) e incidentes; controle de acesso, MFA, OAuth e JWT; criptografia simétrica e assimétrica, hash e assinatura digital; PKI, certificado A1 e A3 e TLS; OWASP Top 10:2025, injeção de SQL e DevSecOps; backup completo, incremental e diferencial, RPO, RTO e a regra 3-2-1; malware, phishing e engenharia social; firewall, IDS e IPS, pentest; Zero Trust e a família ISO 27000. Explique as pegadinhas mais comuns da FCC e diga o que é testado em cada tópico. Quando um item não tiver sido testado nas fontes (nuvem real, contêineres, firewalls e IDS comerciais, ferramentas de pentest), diga que é só documentação."

## 3. Resumo em vídeo (Video Overview)
Instrução sugerida: "Explique em português do Brasil, com exemplos visuais, o caminho de uma conexão segura: o cliente valida o certificado e a cadeia de confiança, o handshake TLS acorda a chave de sessão, os dados são cifrados e autenticados com AES-GCM, e onde cada princípio de segurança (confidencialidade, integridade, autenticidade e não repúdio) é garantido, para um candidato a Técnico de TI do TCE-GO."

## 4. Outras saídas úteis
- Mapa mental (Mind Map) a partir de todas as fontes.
- Cartões de estudo e quiz gerados a partir de 03-questoes-reais-comentadas.md (43 questões: 31 reais da FCC e 12 autorais).
- Perguntas para o chat: "Qual a diferença entre hash, HMAC e assinatura digital?", "Por que o nonce não pode se repetir no AES-GCM?", "Quantas chaves são necessárias para n pessoas na simétrica e na assimétrica?", "O que o cliente TLS valida em um certificado?", "Qual a diferença entre backup incremental e diferencial na restauração?", "O que é RPO e o que é RTO?", "Qual a diferença entre IDS e IPS?", "O que muda do modelo de perímetro para o Zero Trust?", "Quais são as categorias do OWASP Top 10:2025?".

## 5. Aviso importante sobre as questões
As questões de 03-questoes-reais-comentadas.md são 31 reais da FCC, cada uma com o órgão, o ano, o cargo e o número, e 12 AUTORAIS, marcadas no título como "AUTORAL (não é de prova real)". As provas e gabaritos da FCC foram obtidos em sites agregadores (estudegratis.com.br e eticaconcursos.com.br) e não no site da FCC; não foi verificada a existência de recursos ou anulações. Não há questão real da FCC sobre OWASP Top 10:2025, contêineres ou IAM de nuvem entre as provas disponíveis: esses temas são cobertos por questões autorais. O arquivo 04-simulado-autoral.md traz 20 questões AUTORAIS no estilo FCC, que não são de provas reais. Peça ao NotebookLM para manter essa distinção e para nunca atribuir uma questão autoral a uma banca.

## 6. Sobre os laboratórios
Os laboratórios foram executados de verdade, localmente, sem alterar configurações do sistema: hash, HMAC e efeito avalanche; senhas com sal, PBKDF2 e scrypt e entropia; AES-GCM, modo ECB e reuso de nonce; RSA, assinatura, Ed25519, ECDH e envelope híbrido; uma PKI com OpenSSL (AC própria, cadeia, expiração, adulteração, CRL) e um handshake TLS 1.3 em 127.0.0.1; injeção de SQL, XSS, travessia de diretório e injeção de comando; RBAC e ABAC, JWT, HOTP e TOTP; backup completo, incremental e diferencial; análise de risco (ALE), firewall com e sem estado (simulados em Python), detecção de força bruta em log e varredura de portas apenas no localhost; e uma conferência cruzada entre Python e JavaScript. Os tempos medidos variam a cada execução. Itens não testados, marcados como tal no resumo teórico: nuvem real, contêineres e Kubernetes endurecidos, firewalls e IDS comerciais (Snort, Suricata), ferramentas de pentest (nmap, Metasploit), HSM, uma AC da ICP-Brasil real e o texto das normas ISO e NIST.

## 7. Depois de gerar
Cole na página do módulo (seção NotebookLM): o link do caderno, o link do resumo em vídeo e o link do resumo em áudio. Não compartilhe o caderno publicamente sem conferir as configurações de compartilhamento.
