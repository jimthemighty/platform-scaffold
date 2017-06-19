#!/usr/bin/env bash
#Install all depenecies
mkdir logs
./scripts/install-google-chrome-stable.sh > logs/installChrome.log 2>&1 &
./scripts/add-self-signed-cert.sh > logs/addSignedCert.log 2>&1 &
npm install
./tests/system/test-scripts/start-test-server.sh > logs/startTestServer.log 2>&1 &