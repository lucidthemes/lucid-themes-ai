FROM node:26-alpine

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]