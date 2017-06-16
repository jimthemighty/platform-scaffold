#!/usr/bin/env bash
#Upload build artifacts so that they're accessible

cp -R lighthouse/* $CIRCLE_ARTIFACTS
cp -R logs/* $CIRCLE_ARTIFACTS