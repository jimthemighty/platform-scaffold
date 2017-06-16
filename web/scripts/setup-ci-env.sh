#!/usr/bin/env bash
#Install all dependencies

mkdir logs
echo "\nInstall Chrome"
nohup bash -c "./scripts/install-google-chrome-stable.sh &> logs/installChrome.log &"
echo "\nAccept Cert"
nohup bash -c "./scripts/add-self-signed-cert-on-ci.sh &> logs/addSignedCert.log &"
echo "\nNPM Install"
npm install
echo "\nInstall Chrome"
nohup bash -c "./tests/system/start-test-server.sh &> logs/startTestServer.log &"