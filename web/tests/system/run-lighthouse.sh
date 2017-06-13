#!/bin/bash -eu
set -o pipefail
set -o nounset

if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
    # If current branch is master, we test lighthouse on production url
    if [ "$CURRENT_BRANCH" == "master" ]; then
        echo "Running lighthouse on Production"
        npm run test:pwa-prod
    else 
        echo "Running lighthouse on LocalCI"
        npm run test:pwa-ci
    fi
fi
