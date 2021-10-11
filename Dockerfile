FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install -g npm
RUN npm install 
RUN npm install react-scripts

COPY . .

ENV PORT=3000

EXPOSE 3000 
EXPOSE 3001

CMD ["npm", "run", "dev"]
