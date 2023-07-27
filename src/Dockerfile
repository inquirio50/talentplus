# build environment
FROM node:17.8 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose
COPY . ./
COPY .env.production ./.env
RUN chmod +x ./env.sh
RUN ./env.sh
RUN npm run build --production

EXPOSE 3000

# start app
CMD ["npm", "start"]