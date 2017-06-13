#!/bin/bash -eu
set -o pipefail
set -o nounset

# Start the local test server if the current git branch is not master.
# Assumes that tests on master branch should run against production. 
if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
    if [ "$CURRENT_BRANCH" != "master" ]; then
        echo "Running tests against local build."
        # Kill background processes when this script exits.
        trap 'kill $(jobs -p)' EXIT
        echo "Running Test Server."
        npm run prod:build
        npm run test:server
    fi
else
    echo "On production branch, test server not needed."
fi
