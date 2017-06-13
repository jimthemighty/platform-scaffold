#!/usr/bin/env bash
echo "Waiting for dev server to become active"
while ! nc -z localhost 8443; do sleep 2; done