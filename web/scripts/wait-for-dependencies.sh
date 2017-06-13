#!/usr/bin/env bash

echo "Waiting for npm prod:build to complete"
while [ ! -f web/build/loader.js ]; do sleep 2; done
echo "npm prod:build is complete"

echo "Waiting for dev server to become active"
while ! nc -z localhost 8443; do sleep 2; done
echo "Waiting for dev server is now active"