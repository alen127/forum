FROM node:20-alpine
WORKDIR /usr/src/forum-app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --omit dev

COPY config ./config
COPY server.js dbInit.js ./
COPY ./app ./app

CMD [ "node", "server.js" ]