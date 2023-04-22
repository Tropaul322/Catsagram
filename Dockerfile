FROM node:16

WORKDIR /usr/src/app/

COPY package*.json ./
COPY ./dist/apps/api .
COPY ./.env .
RUN npm install

CMD [ "node", "./main.js" ]