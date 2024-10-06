FROM node:20
WORKDIR /usr/
ENV PORT=3000
COPY . . 
RUN npm install
COPY package*.json ./
CMD [ "npm", "run", "start" ]