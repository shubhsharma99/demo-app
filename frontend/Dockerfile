# Dockerfile for Frontend
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]
