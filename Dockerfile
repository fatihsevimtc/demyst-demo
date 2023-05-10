FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#docker build -t business-loan-application .
#docker run -p 3000:3000 business-loan-application
