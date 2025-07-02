FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install bullmq@latest --save

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
