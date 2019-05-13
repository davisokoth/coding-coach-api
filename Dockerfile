FROM mcr.microsoft.com/azure-functions/node:2.0

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node
ENV AzureWebJobsScriptRoot=/home/node
COPY package.json /home/node
# RUN npm i -g copyfiles onchange rimraf typescript ttypescript
RUN npm i -g azure-functions-core-tools@core --unsafe-perm true
RUN npm install
COPY . /home/node
EXPOSE 7071
CMD [ "npm", "run", "start"]