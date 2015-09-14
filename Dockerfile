FROM node:latest

# Set SOURCE_DIR variable, make the directory, and set it as work directory
ENV SOURCE_DIR /usr/src
RUN mkdir -p $SOURCE_DIR
WORKDIR $SOURCE_DIR

COPY package.json $SOURCE_DIR/
COPY server.js $SOURCE_DIR/

RUN npm install && \
    npm config set production

EXPOSE 8080

CMD [ "npm", "start" ]
