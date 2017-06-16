#!/usr/bin/env bash

printf "Waiting for Chrome to finish installing"
baseline="59"
google-chrome --version
while [ "$baseline" -gt "$(google-chrome --version | awk -F '.' '{print $1}' | awk '{print $3}')" ]; 
    do google-chrome --version 
    printf "still updating chrome..."
    sleep 2; done
printf "Chrome installed\n"

printf "Waiting for npm prod:build to complete"
while [ ! -f build/loader.js ]; 
    do 
    cat logs/startTestServer.log
    sleep 1
    5; done
printf "npm prod:build is complete\n"

printf "Waiting for test server to become active"
while ! nc -z localhost 8443; do sleep 2; done
printf "8443 test server is now active"