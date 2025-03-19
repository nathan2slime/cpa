FROM node:20-alpine AS base

RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add openssl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

COPY . /app
WORKDIR /app
RUN pnpm i turbo --g
COPY . .
RUN turbo prune @kwa/api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install
# Build the project and its dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/out/full/ .

ENV NODE_ENV production

RUN pnpm turbo build --filter=@kwa/database
RUN pnpm turbo build --filter=@kwa/api

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
COPY --from=installer --chown=nodejs:nodejs /app .


USER root
COPY apps/api/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

USER nodejs
EXPOSE 5400

ENTRYPOINT ["./entrypoint.sh"]