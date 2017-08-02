#!/bin/bash -eu
set -o pipefail
set -o nounset

echo 'Running End to End Tests'
#If we have nodes > 2, it will be part of the division to run another test:e2e
i=0
for testfile in $(find ./tests/e2e/workflows/ -name '*.js'| sort); do
  if [ $(expr $i % $(expr $CIRCLE_NODE_TOTAL - 1)) -eq $(expr $CIRCLE_NODE_INDEX - 1) ]; then
    echo 'Running test: ' ${testfile}
    npm run test:e2e --test ${testfile}
  fi
  ((i=i+1))
done
