#Add a self-signed SSL Certificate to allow working with Mobify Preview
echo 'Accept Cert'
sudo apt-get install libnss3-tools
 # Initialize database of certificates
mkdir -p $HOME/.pki/nssdb
# Pass in a password
certutil -d $HOME/.pki/nssdb -N --empty-password
# Add self-signed SSL certificate
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n dev-server/localhost.pem -i dev-server/localhost.pem