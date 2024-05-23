# Dockerfile for app

#######################
# Install stage
#######################
FROM node:lts-alpine3.18 AS installer
# RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app
COPY . .
RUN npm install

#######################
# Build stage
#######################
FROM installer AS build
# RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app

ARG BACKEND_URL
ENV VITE_BACKEND_URL $BACKEND_URL
ARG SOCKET_URL
ENV VITE_SOCKET_URL $SOCKET_URL

RUN npm run build

#######################
# Server stage
#######################
FROM build AS server
WORKDIR /app
COPY --from=build /app/dist /app/dist

RUN addgroup --system --gid 1001 cruzzle && \
  adduser --system --uid 1001 cruzzle
USER cruzzle

CMD npm run preview