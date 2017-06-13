#!/usr/bin/env bash

OUTPUT_PATH=./lighthouse/audit-prod
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}

lighthouse \
	--view \
	--output json \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL

node ./lighthouse/check-score.js
