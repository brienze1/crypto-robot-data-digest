FROM node:18-alpine as lambda

ARG PORT=8000
ENV PORT=$PORT
WORKDIR /usr/src
COPY . .

# Install zip in container
RUN apk update
RUN apk add zip
RUN apk add python3
RUN apk add py3-pip
RUN apk add curl
RUN apk add sudo

# Update NPM
RUN npm config set unsafe-perm true
RUN npm update -g

# Enter the src directory, install dependencies
RUN cd src && npm install && npm run build

# zip the src directory in the container
RUN zip -r crypto-robot-data-digest.zip dist

# creating a symlink to python3
RUN sudo ln -s /usr/bin/python3 /usr/bin/python

# install awscli
RUN curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
RUN unzip awscli-bundle.zip
RUN sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

ENTRYPOINT []