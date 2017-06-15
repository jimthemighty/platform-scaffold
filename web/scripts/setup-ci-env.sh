#!/usr/bin/env bash
#Install all depenecies
mkdir logs
./scripts/install-google-chrome-stable.sh $> logs/installChrome.log &
./scripts/add-self-signed-cert.sh &> logs/addSignedCert.log &
npm install
./tests/system/start-test-server.sh &> logs/startTestServer.log &