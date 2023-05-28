FROM node:16 as base

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

FROM base as production
EXPOSE 3334

CMD ["npm", "run", "start"]
