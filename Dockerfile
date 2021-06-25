FROM node:latest
RUN npm config set registry "https://registry.npm.taobao.org/"
RUN npm install pm2 -g
WORKDIR /root/api
COPY . .
RUN npm install
CMD ["pm2","start","--no-daemon","index.js"]
EXPOSE 3333