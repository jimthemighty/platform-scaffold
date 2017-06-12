#!/bin/bash -eu
set -o pipefail
set -o nounset

if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
    # If current branch is master, we eliminate preview because we're testing production'
    if [ "$CURRENT_BRANCH" == "master" ]; then
        echo "Running lighthouse on Production"
        npm run test:pwa-prod
    fi
else
    echo "Running lighthouse on Local"
    npm run test:pwa-ci
fi