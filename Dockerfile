FROM node

WORKDIR /usr/src/pds
COPY package.json ./
RUN npm install
RUN npm build

COPY ./out ./
EXPOSE 6969

CMD ["npm", "run", "start"]