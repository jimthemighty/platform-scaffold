#!/bin/bash -eu
set -o pipefail
set -o nounset

if [ $TEST_PROFILE == "production" ]; then
    echo "Running Lighthouse agaisnt Production."
    npm run test:pwa-prod
else
    echo "Running Lighthouse agaisnt Local."
    npm run test:pwa-ci
fi