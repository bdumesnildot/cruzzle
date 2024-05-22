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

ENV NODE_ENV production
ENV FRONTEND_URL http://localhost:3000
ENV DB_PRISMA_URL mysql://USER:PASSWORD@HOST:PORT/DATABASE

RUN npm run build

#######################
# Run stage
#######################
FROM builder AS runner
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
COPY --from=builder /app/dist /app/dist
EXPOSE 8010

# Don't run production as root
RUN addgroup --system --gid 1001 cruzzle && \
  adduser --system --uid 1001 cruzzle
USER cruzzle

CMD npm run start