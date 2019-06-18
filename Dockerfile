FROM mcr.microsoft.com/azure-functions/node:2.0

USER root

# Based on instructiions at https://docs.microsoft.com/en-us/dotnet/core/linux-prerequisites?tabs=netcore2x
# Install depency for dotnet core 2.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    curl libunwind8 gettext apt-transport-https && \
    curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
    mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg && \
    sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-debian-stretch-prod stretch main" > /etc/apt/sources.list.d/dotnetdev.list' && \
    apt-get update

# Install the .Net Core framework, set the path, and show the version of core installed.
RUN apt-get install -y dotnet-sdk-2.0.0 && \
    export PATH=$PATH:$HOME/dotnet && \
    dotnet --version

# Not sure if its hacky, but needs to install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

RUN useradd -m node && echo "node:node" | chpasswd && adduser node sudo
RUN mkdir /home/.npm
RUN mkdir /home/.cache
RUN mkdir /home/.azurefunctions
RUN chown -R node /home/.npm
RUN chown -R node /home/.cache
RUN chown -R node /home/.azurefunctions
RUN chown -R node /home/.dotnet

# Good idea to switch back to the node user.
USER node

RUN mkdir -p /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV PATH=$PATH:/home/node/.npm/bin
WORKDIR /home/node/app
ENV AzureWebJobsScriptRoot=/home/node/app
COPY package.json /home/node/app
RUN npm i -g copyfiles onchange rimraf typescript ttypescript
RUN npm i -g azure-functions-core-tools@core --unsafe-perm true
COPY . /home/node/app
EXPOSE 7071
# CMD [ "npm", "run", "start"]