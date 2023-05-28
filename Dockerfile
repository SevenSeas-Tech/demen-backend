FROM node:16 as base

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

FROM base as production
EXPOSE 3334

RUN npm run build

CMD ["npm", "run", "start"]
