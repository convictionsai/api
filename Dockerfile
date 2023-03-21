FROM node:16-alpine3.14 AS builder

ARG NPM_TOKEN

WORKDIR /app

RUN echo -e "@convictionsai:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > ~/.npmrc

COPY package.json       package.json
COPY package-lock.json  package-lock.json

RUN npm install

COPY tsconfig.json       tsconfig.json
COPY src                src

RUN npm run build

FROM node:16-alpine3.14

WORKDIR /app

RUN adduser -S -h /app app
USER app

COPY --from=builder /app/node_modules       node_modules
COPY --from=builder /app/dist               dist

ENTRYPOINT ["node", "/app/dist/main.js"]
