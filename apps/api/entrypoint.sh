#!/bin/sh

set -e

pnpm db:migrate:deploy
exec pnpm start
