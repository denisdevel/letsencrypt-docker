#!/usr/bin/env bash
set -e

exit_cmd() {
    eval 'echo "Error: $1" 1>&2; exit 1'
}

if [[ "$EUID" -ne 0 ]]; then
    exit_cmd "Please ensure you are running as sudo"
fi

echo "Installing Docker..."
apt-get update || exit_cmd "update error"
apt-get install apt-transport-https docker-compose ca-certificates curl software-properties-common -y || exit_cmd "apt install error"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - || exit_cmd "adding key"
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" || exit_cmd "adding repository"
apt-get update || exit_cmd "apt update"
apt-get install docker-ce -y || exit_cmd "docker install"
usermod -aG docker $SUDO_USER || exit_cmd "adding user"
apt-get install python-pip -y || exit_cmd "pip install"
pip install --upgrade pip setuptools docker-compose --user || exit_cmd "docker-compose install"
systemctl enable docker || exit_cmd "start on boot"
exec su -l $SUDO_USER || exit_cmd "couldn't reload groups"
