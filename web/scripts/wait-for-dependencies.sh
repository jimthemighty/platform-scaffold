#!/usr/bin/env bash

echo "Waiting for Chrome to finish installing"
baseline="59"
google-chrome --version
counter=0
while [ "$baseline" -gt "$(google-chrome --version | awk -F '.' '{print $1}' | awk '{print $3}')" ]; 
    do google-chrome --version 
    echo "still updating chrome..."
    cat logs/installChrome.log
    sleep 2; done
printf "Chrome installed\n"

echo "Waiting for npm prod:build to complete"
while [ ! -f build/loader.js ]; do sleep 2; done
printf "npm prod:build is complete\n"

echo "Waiting for test server to become active"
while ! nc -z localhost 8443; do sleep 2; done
printf "8443 test server is now active\n"