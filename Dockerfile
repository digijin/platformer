FROM node:8
RUN apt-get update
# for flow-watch
RUN apt-get install -y ocaml libelf-dev

COPY . /var/dev/
WORKDIR /var/dev
RUN cd /var/dev
RUN yarn
RUN npm rebuild
ENTRYPOINT bash