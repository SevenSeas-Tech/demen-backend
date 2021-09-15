FROM node:16 as base

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9229


FROM base as development

EXPOSE 3333

CMD ["npm", "run", "dev:server"]


FROM base as production
EXPOSE 3334

CMD ["npm", "run", "prod:server"]






