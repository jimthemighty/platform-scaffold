#!/usr/bin/env bash
set -o pipefail

echo 'Sending JS payload to Saucelabs REST API'
curl -X POST https://saucelabs.com/rest/v1/mquan/js-tests \
     -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
     -H 'Content-Type: application/json' \
     -d '{
          "platforms": [["macOS 10.12", "chrome", "59.0"]],
          "url": "http://localhost:8999/tag.test.html",
          "framework": "qunit"
        }' \
| tee /dev/stderr | tail -1 > js-tests.json

echo 'Waiting for test to finish...'
while true
do
  sleep 5
  echo '...checking status'
  curl -i -X POST https://saucelabs.com/rest/v1/$SAUCE_USERNAME/js-tests/status \
       -u $SAUCE_USERNAME:$SAUCE_ACCESS_KEY \
       -H 'Content-Type: application/json' \
       -d @js-tests.json \
  | tee /dev/stderr | tail -1 > status.json

  # deliberately do `... != false` rather than `... == true`
  # because unexpected values should break rather than infinite loop
  echo 'Done'
  [ "$(jq .completed <status.json)" != false ] && break
done

echo '3. Exit with non-zero status code if any unit tests failed'
exit "$(jq '.["js tests"][0].result.failures' <status.json)"
