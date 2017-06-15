#!/usr/bin/env bash

echo "Waiting for Chrome to finish installing"
baseline="59"
google-chrome --version
while [ "$baseline" -gt "$(google-chrome --version | awk -F '.' '{print $1}' | awk '{print $3}')" ]; 
    do google-chrome --version 
    echo "still updating chrome..."
    sleep 2; done
echo "Chrome installed"

echo "Waiting for npm prod:build to complete"
while [ ! -f build/loader.js ]; do sleep 2; done
echo "npm prod:build is complete"

echo "Waiting for test server to become active"
while ! nc -z localhost 8443; do sleep 2; done
echo "8443 test server is now active"