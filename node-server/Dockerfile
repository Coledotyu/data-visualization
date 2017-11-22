FROM daocloud.io/baidao/node-rscript:1.0
 
RUN wget https://www.npmjs.com/install.sh --no-check-certificate &&\
    sh install.sh &&\
    npm config set registry https://registry.npm.taobao.org &&\
    npm install -g pm2

WORKDIR /var/workspace

COPY package.json .

COPY scripts/packages.R .

RUN npm install --production && npm cache clean &&\
    Rscript packages.R

COPY . .

EXPOSE 3001

CMD ["pm2-docker", "app.js"]
