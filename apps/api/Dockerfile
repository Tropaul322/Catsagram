FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system api && \
          adduser --system -G api api

COPY dist/apps/api dist
COPY node_modules ./dist/node_modules

RUN chown -R api:api .

CMD [ "node", "dist/main.js" ]
