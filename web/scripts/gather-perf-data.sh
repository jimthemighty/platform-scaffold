#!/usr/bin/env bash

REPO_NAME=${CIRCLE_PROJECT_REPONAME:-Repo Name}
GIT_HASH=${CIRCLE_SHA1:-Commit}
BRANCH=${CIRCLE_BRANCH:-Branch}
TTI=${TIME_TO_INTERACTIVE}
REPORT_PATH=${CIRCLE_ARTIFACTS:-`pwd`/reports}/audit-local.html


# ID=${CIRCLE_BUILD_NUM:-test}
# curl https://hooks.zapier.com/hooks/catch/87314/9mex4p/

curl \
	-H 'Accept: application/json' \
	-H 'Content-Type: application/json' \
	-X POST \
	-d "{ \"repo_name\": \"$REPO_NAME\", \"git_hash\": \"$GIT_HASH\", \"branch\": \"$BRANCH\",  \"tti\": \"$TTI\", \"report\": \"$REPORT_PATH\" }" \
	https://hooks.zapier.com/hooks/catch/87314/9mex4p/

exit 0
