#!/usr/bin/env bash
npm run test:e2e 

./scripts/change-connector.sh merlins sfcc
echo 'Running Tests on SFCC Connector'
sleep 1
npm run test:e2e -- --tag sfcc --group workflows/sfcc

./scripts/change-connector.sh sfcc stub
echo 'Running Tests on stub Connector'
sleep 1
npm run test:e2e -- --tag stub --group workflows/stub