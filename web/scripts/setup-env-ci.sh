#!/usr/bin/env bash
#Install all dependencies on circleci

mkdir logs
printf "\nInstall Chrome: "
nohup bash -c "./scripts/update-chrome-accept-cert-ci.sh &> logs/apt-get.log &"
printf "\nNPM Install: "
npm install
printf "\nStart Test Server: "
nohup bash -c "./scripts/start-tag-server.sh &> logs/startTagTestServer.log &"