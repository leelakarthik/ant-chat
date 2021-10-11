FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
<<<<<<< HEAD
RUN npm install -g npm
=======
COPY package-lock.json ./

>>>>>>> 51a8cadfdd494cd84571e89a805f7ddde1a6ef99
RUN npm install 
RUN npm install react-scripts

COPY . .

ENV PORT=3000

<<<<<<< HEAD
EXPOSE 3000 
EXPOSE 3001

CMD ["npm", "run", "dev"]
=======
EXPOSE 3000

CMD ["npm", "start"]
>>>>>>> 51a8cadfdd494cd84571e89a805f7ddde1a6ef99
