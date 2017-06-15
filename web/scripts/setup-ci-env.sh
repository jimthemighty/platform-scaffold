#!/usr/bin/env bash
#Install all depenecies
mkdir $CIRCLE_ARTIFACTS/logs
pwd web
./scripts/install-google-chrome-stable.sh $> $CIRCLE_ARTIFACTS/logs/installChrome.log &
./scripts/add-self-signed-cert.sh &> $CIRCLE_ARTIFACTS/logs/addSignedCert.log &
npm install
./tests/system/start-test-server.sh &> $CIRCLE_ARTIFACTS/logs/startTestServer.log &