#!/bin/bash -eu
set -o pipefail
set -o nounset

#If the node total is 1, run all the tests sequentially. 
if [ $CIRCLE_NODE_TOTAL -eq 1 ]; then
  echo 'Running End to End Tests'
  npm run test:e2e
else
  #If the node total is greater than 1 
  # The other circle_node_index worker will run the rest of the tests
  if [ $CIRCLE_NODE_TOTAL -gt 1 ]; then
    echo $CIRCLE_NODE_TOTAL 'Circle CI nodes. Running tests in parallel.'
    echo 'This is Circle CI node' $CIRCLE_NODE_INDEX'.'

    # The other circle_node_index worker will run the rest of the tests
    ./scripts/wait-for-dependencies.sh
    echo 'Running End to End Tests'
    i=0
    for testfile in $(find ./tests/system/workflows/ -name '*.js'| sort); do
      if [ $(expr $i % $(expr $CIRCLE_NODE_TOTAL)) -eq $(expr $CIRCLE_NODE_INDEX) ]; then
        echo 'Running test: ' ${testfile}
        npm run test:e2e --test ${testfile}
      fi
      ((i=i+1))
    done
    fi
  fi
fi