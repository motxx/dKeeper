#!/bin/sh
set -eu

NODE_OPTIONS="--max-old-space-size=3000"
# Add any other Node.js options you need here

# exec node $NODE_OPTIONS $LAMBDA_TASK_ROOT/index.js
if [ -z "${AWS_LAMBDA_RUNTIME_API}" ]; then
  exec /usr/local/bin/aws-lambda-rie npx aws-lambda-ric $@
else
  exec npx aws-lambda-ric $@
fi
