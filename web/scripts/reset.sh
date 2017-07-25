#!/usr/bin/env bash
set -e
webpack --config webpack/base.reset.js -p --display-error-details --bail
