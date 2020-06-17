#!/usr/bin/env bash

# UPDATE
sudo yum update -y

# DOCKER
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker

# DOCKER COMPOSE
sudo curl -L https://github.com/docker/compose/releases/download/1.25.0-rc4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# LINUX AGENT FOR AZURE DEVOPS
sudo mkdir myagent && cd myagent
sudo wget "https://vstsagentpackage.azureedge.net/agent/2.159.2/vsts-agent-linux-x64-2.159.2.tar.gz"
cd myagent
sudo tar zxvf /home/administrator/myagent/vsts-agent-linux-x64-2.159.2.tar.gz
sudo rm /home/administrator/myagent/vsts-agent-linux-x64-2.159.2.tar.gz -f -d -r

# Give Administrator account acces to config agent
sudo usermod -a -G docker administrator
sudo chown -R administrator:docker /home/administrator/myagent

#Configure Agent -variables AGENTPOOL/URL/TOKEN
TOKEN="r2qamyku53spqzyrxolwscwwxgxyyz6c6xh3gpqmfakzqm5ozfka"
AGENTPOOL="maximus-development"
URL="https://dev.azure.com/Codious"
SERVER=$(hostname)
./config.sh --unattended --url $URL --auth pat --token $TOKEN --pool $AGENTPOOL --agent $SERVER --work ./_work --acceptTeeEula
sudo ./svc.sh install
sudo ./svc.sh start

# ENVIRONMENT
#sudo echo "LANG=en_US.utf-8" >> /etc/environment
#sudo echo "LC_ALL=en_US.utf-8" >> /etc/environment
