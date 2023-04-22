FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system api && \
          adduser --system -G api api

COPY ./apps/api/app dist
COPY node_modules ./dist/node_modules

RUN chown -R api:api .

CMD [ "node", "dist/main.js" ]
