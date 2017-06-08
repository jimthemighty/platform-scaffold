#!/bin/bash -eu
set -o pipefail
set -o nounset

if [ $TEST_PROFILE == "production" ]; then
    echo "Running Lighthouse against Production."
    npm run test:pwa-prod
else
    echo "Running Lighthouse against Local."
    npm run test:pwa-ci
fi
