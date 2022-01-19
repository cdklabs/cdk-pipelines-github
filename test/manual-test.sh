#!/bin/bash
set -euo pipefail
set -x
scriptdir="$(cd $(dirname $0) && pwd)"
app="npx ts-node -P ${scriptdir}/../tsconfig.dev.json ${scriptdir}/manual-test.ts"
npx cdk --app "${app}" synth
