#Just some steps to get this running on ubuntu

apt get install npm
npm install -g yarn   
npm install -g n
n 9.0
PATH="$PATH"
yarn install
yarn start


#You also have to install postgres again
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-9.6 postgresql-contrib-9.6
service postgresql status

