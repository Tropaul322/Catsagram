FROM node:alpine As development

WORKDIR /usr/src/app/rmq

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run" "start:dev"]