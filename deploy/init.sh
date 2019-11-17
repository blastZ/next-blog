# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
# export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node // node mirror for internal server
nvm install v12.13.0
source ~/.bashrc
# npm config set registry https://registry.npm.taobao.org // npm mirror for internal server
npm install -g pm2
pm2 ls

# install git
yum -y install  https://centos7.iuscommunity.org/ius-release.rpm
yum -y install  git2u-all
git --version

# install nginx
yum -y install epel-release
yum -y install nginx
systemctl start nginx
nginx -t

# install net-tools
yum -y install net-tools
netstat -ntlp

# install ufw
yum -y install ufw
ufw enable
ufw status
ufw allow SSH
ufw allow http
ufw allow https

# allow http proxy on SELinux
/usr/sbin/setsebool httpd_can_network_connect true