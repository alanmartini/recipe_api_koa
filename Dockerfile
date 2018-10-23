FROM node:8.11.3-alpine

RUN npm install

CMD [ "node", "bin/www" ]
