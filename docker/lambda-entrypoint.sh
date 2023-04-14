#!/bin/sh
set -eu

NODE_OPTIONS="--max-old-space-size=3000"
# Add any other Node.js options you need here

exec node $NODE_OPTIONS /var/runtime/index.js