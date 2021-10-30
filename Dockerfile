FROM node:14

WORKDIR /app

COPY ["package.json", "package-lock.json",  "./"] 

RUN npm install

COPY . .

ADD docker-entrypoint.sh /usr/src/app/
ADD wait-for-it.sh /usr/src/app/

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

RUN ["chmod", "+x", "/usr/src/app/docker-entrypoint.sh"]
RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]

CMD ["/usr/src/app/docker-entrypoint.sh", "npm","start"]