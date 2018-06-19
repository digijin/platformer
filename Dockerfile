FROM mhart/alpine-node:8.11

RUN apk update && apk add imagemagick && rm -rf /var/cache/apk/*

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

RUN mkdir /var/app
RUN cd /var/app
WORKDIR /var/app

COPY . /var/app
RUN yarn
RUN npm rebuild

RUN ls

RUN yarn build
RUN yarn build:sprites


ENTRYPOINT npm run serve
