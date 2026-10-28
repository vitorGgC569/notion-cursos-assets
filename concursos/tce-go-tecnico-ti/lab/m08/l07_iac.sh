#!/usr/bin/env bash
# Pratica 7: IaC com OpenTofu (declarativo, plan/apply, idempotencia, drift, destroy) e Ansible (idempotente)
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock TF_IN_AUTOMATION=1 TF_CLI_ARGS=-no-color TF_PLUGIN_CACHE_DIR=/workspace/m8tools/plugin-cache
mkdir -p $TF_PLUGIN_CACHE_DIR
W=/tmp/m8-iac-$$; mkdir -p $W; cp -r "$D/iac-tf" "$D/iac-ansible" $W/; cd $W/iac-tf
LIMPA() { cd $W/iac-tf; tofu destroy -auto-approve >/dev/null 2>&1; docker rm -f m8do-tf-web-dev m8do-tf-web-hom >/dev/null 2>&1; }
trap LIMPA EXIT
t "1. Versao, init, fmt e validate"
c "tofu version | head -1"
c "tofu init 2>&1 | grep -E 'Installing|Installed|Initializing|successfully' | sed -E 's/\(signed.*//'"
c "tofu fmt -check && echo 'fmt: formatado'; tofu validate"
t "2. plan: o que vai mudar (nada foi criado ainda)"
c "tofu plan -out=plano.bin 2>&1 | grep -E '^\s*# |Plan:|Changes to Outputs|^\s+\+ url'"
t "3. apply: cria a infraestrutura"
c "tofu apply plano.bin 2>&1 | grep -E 'Creating|Creation|Apply complete|url'"
c "cat saida/app-dev.conf"
c "docker ps --filter name=m8do-tf-web --format '{{.Names}} {{.Image}} {{.Ports}}'"
c "curl -s -o /dev/null -w 'HTTP %{http_code}\n' localhost:15803"
c "tofu state list"
t "4. Idempotencia: aplicar de novo nao muda nada"
c "tofu plan 2>&1 | grep -E 'No changes|Plan:|up-to-date'"
t "5. Mudanca declarada: a porta passa a ser 15804"
c "tofu plan -var porta=15804 2>&1 | grep -E '^\s*# |forces replacement|Plan:|^\s+[-+] porta='"
c "tofu apply -auto-approve -var porta=15804 2>&1 | grep -E 'Destroying|Creating|Modifying|Apply complete|url'"
c "curl -s -o /dev/null -w 'HTTP %{http_code} na 15804\n' localhost:15804"
t "6. Drift: alguem altera o arquivo na mao; o plan detecta e o apply corrige"
echo 'ambiente=ALTERADO-NA-MAO' > saida/app-dev.conf
c "tofu plan -var porta=15804 2>&1 | grep -E 'changed outside|^\\s*# |Plan:|No changes'"
c "tofu apply -auto-approve -var porta=15804 2>&1 | grep -E 'Apply complete'"
c "cat saida/app-dev.conf"
t "7. Validacao de variavel e novo ambiente (hom)"
c "tofu plan -var ambiente=teste 2>&1 | grep -E 'Error|ambiente deve' | head -2"
c "tofu plan -var porta=15804 -var ambiente=hom 2>&1 | grep -E '^\\s*# |Plan:'"
t "8. destroy: remove tudo o que o estado conhece"
c "tofu destroy -auto-approve -var porta=15804 2>&1 | grep -E 'Destroying|Destruction|Destroy complete'"
c "tofu state list | wc -l; docker ps -a --filter name=m8do-tf -q | wc -l; ls saida"
t "9. Ansible (IaC procedural-idempotente): duas execucoes seguidas"
export ANSIBLE_NOCOLOR=1 ANSIBLE_FORCE_COLOR=0 DESTINO=$W/srv ANSIBLE_LOCALHOST_WARNING=False ANSIBLE_INVENTORY_UNPARSED_WARNING=False
AP=/workspace/m8tools/ans/bin; cd $W/iac-ansible
mkdir -p $W/srv/etc/app; echo velho > $W/srv/etc/app/legado.conf
c "$AP/ansible --version | head -1"
c "$AP/ansible-playbook playbook.yml 2>&1 | grep -E 'TASK|changed:|ok:|PLAY RECAP|localhost'"
c "$AP/ansible-playbook playbook.yml 2>&1 | grep -E 'TASK|changed:|ok:|PLAY RECAP|localhost'"
sed -i 's/workers=4/workers=1/' $W/srv/etc/app/app.conf
c "$AP/ansible-playbook playbook.yml --check --diff 2>&1 | grep -E 'changed:|^[-+][a-z]|PLAY RECAP|localhost'"
c "cat $W/srv/etc/app/app.conf"
c "$AP/ansible-playbook playbook.yml 2>&1 | grep -E 'PLAY RECAP|localhost *:'"
c "cat $W/srv/etc/app/app.conf"
