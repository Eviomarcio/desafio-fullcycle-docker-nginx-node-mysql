FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y wget && \
    npm install && \
    npm install mysql2@latest
    
ENV DOCKERIZE_VERSION v0.6.1

RUN apt-get update \
    && apt-get install -y wget openssl \
    && wget -O - "https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz" | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY . .
    
#ENTRYPOINT ["dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "node", "index.js"]
