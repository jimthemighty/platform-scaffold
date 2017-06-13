#!/usr/bin/env bash

echo "Waiting for npm prod:build to complete"
while [ ! -f build/loader.js ]; do sleep 2; done
echo "npm prod:build is complete"

echo "Waiting for dev server to become active"
while ! nc -z localhost 8443; do sleep 2; done
echo "8443 dev server is now active"