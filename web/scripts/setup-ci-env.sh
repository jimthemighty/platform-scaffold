#!/usr/bin/env bash
#Install all dependencies

mkdir logs
printf "\nInstall Chrome: "
nohup bash -c "./scripts/install-google-chrome-stable.sh &> logs/installChrome.log &"
printf "\nAccept Cert: "
nohup bash -c "./scripts/add-self-signed-cert-on-ci.sh &> logs/addSignedCert.log &"
printf "\nNPM Install: "
npm install
printf "\nInstall Chrome: "
nohup bash -c "./tests/system/start-test-server.sh &> logs/startTestServer.log &"