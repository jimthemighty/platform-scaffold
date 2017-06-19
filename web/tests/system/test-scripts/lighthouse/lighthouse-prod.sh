#!/usr/bin/env bash

OUTPUT_PATH=tests/system/test-scripts/lighthouse/reports/audit-prod
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}

lighthouse \
	--view \
	--output json \
	--output html \
	--output-path $OUTPUT_PATH \
	$URL

node tests/system/test-scripts/check-lighthouse-score.js
