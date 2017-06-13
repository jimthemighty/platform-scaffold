#Install Nightly version of Yarn
#https://yarnpkg.com/en/docs/nightly

sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
echo "deb http://nightly.yarnpkg.com/debian/ nightly main" | sudo tee /etc/apt/sources.list.d/yarn-nightly.list
sudo apt-get update && sudo apt-get install yarn