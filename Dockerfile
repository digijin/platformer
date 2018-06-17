FROM mhart/alpine-node:8.11

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

RUN mkdir /var/app
RUN cd /var/app

COPY . /var/app
WORKDIR /var/app
RUN yarn
RUN npm rebuild

ENTRYPOINT npm run dev
