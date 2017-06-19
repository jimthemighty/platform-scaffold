#!/usr/bin/env bash
#Upload build artifacts so that they're accessible

cp -R tests/system/test-scripts/lighthouse/* $CIRCLE_ARTIFACTS
cp -R logs/* $CIRCLE_ARTIFACTS
