#!/usr/bin/env bash
#Upload build artifacts so that they're accessible

cp -R tests/e2e/test-scripts/lighthouse/reports/* $CIRCLE_ARTIFACTS
cp -R logs/* $CIRCLE_ARTIFACTS
