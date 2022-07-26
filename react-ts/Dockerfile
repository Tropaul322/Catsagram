FROM node:alpine As development

WORKDIR /usr/src/app/web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run" "start"]