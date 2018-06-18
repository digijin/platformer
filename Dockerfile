FROM mhart/alpine-node:8.11

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

RUN mkdir /var/app
RUN cd /var/app

COPY package.json /var/app
COPY node_modules /var/app
RUN yarn
RUN npm rebuild

COPY . /var/app
WORKDIR /var/app

ENTRYPOINT npm run serve
