#!/usr/bin/env bash

# Location to save the generated HTML report.
OUTPUT_PATH=tests/system/test-scripts/lighthouse/audit-local.html
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}
# Append Mobify Hash to the URL to force the Mobify Tag to load the local bundle.
PREVIEW=#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

# The development server should already be running via 'npm run dev'
# Lighthouse uses your local installation of Chrome, which should be at least 
# version 54.0. Use a custom user agent containing "MobifyPreview" so that 
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden. 
# Make sure you have trusted the self-signed SSL certificate. 
# See 'Prevent SSL Errors in Preview' in the README.

lighthouse \
	--view \
	--chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost' \
	--output=html \
	--output-path=${OUTPUT_PATH} \
	--disable-device-emulation=true \
	"${URL}${PREVIEW}"

 