#!/usr/bin/env bash
npm run test:e2e

./scripts/change-connector.sh merlins sfcc
npm run test:e2e --tag sfcc

./scripts/change-connector.sh sfcc stub
npm run test:e2e --tag stub
