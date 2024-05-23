# Dockerfile for api-socket

#######################
# Install stage
#######################
FROM node:lts-alpine3.17 AS installer
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
COPY . .
RUN npm install

#######################
# Build stage
#######################
FROM installer AS builder
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app

RUN npm run build

#######################
# Run stage
#######################
FROM builder AS runner
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
COPY --from=builder /app/dist /app/dist

ENV API_PORT 8010
EXPOSE ${API_PORT}

RUN addgroup --system --gid 1001 cruzzle && \
  adduser --system --uid 1001 cruzzle
USER cruzzle

CMD npm run start