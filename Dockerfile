FROM node:18-alpine as lambda

WORKDIR /usr/src
COPY . .

# Install zip in container
RUN apk update
RUN apk add zip

# Update NPM
RUN npm config set unsafe-perm true
RUN npm update -g

# Enter the src directory, install dependencies
RUN cd src && npm install && npm run build && npm prune --production

# zip the src directory in the container
RUN zip -r crypto-robot-data-digest.zip dist node_modules

ENTRYPOINT []
