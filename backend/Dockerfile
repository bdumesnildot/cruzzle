# Dockerfile for api

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
EXPOSE 8000
CMD npm run start