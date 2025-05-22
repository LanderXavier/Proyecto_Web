FROM node:20

WORKDIR /backend

COPY package*.json ./
RUN npm install

# Instala netcat para el script de espera
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

EXPOSE 8000
CMD ["sh", "-c", "until nc -z mysqldb 3306; do echo Waiting for MySQL...; sleep 2; done; node server.js"]