FROM node:14.17.0-alpine

WORKDIR /opt/nodejs-rabbitmq

COPY package.json .
COPY yarn.lock .

RUN npm install

COPY . .

RUN npm run build

COPY ./build . 

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=client

CMD ["npm", "run", "serve"]