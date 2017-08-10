# build process:
# docker build -t mobify/scaffold-docker .
# to run:
# docker run -it -p 8443:8443 -v `pwd`/web/app:/home/ubuntu/platform-scaffold/web/app mobify/scaffold-docker

FROM mobify/cci-docker-primary:0.0.15
MAINTAINER Mobify <ops@mobify.com>

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.11.0
ENV YARN_VERSION 0.24.6

ADD web /home/ubuntu/platform-scaffold/web
WORKDIR /home/ubuntu/platform-scaffold/web

RUN npm install

ADD native /home/ubuntu/platform-scaffold/native

EXPOSE 8443

CMD ["/usr/bin/npm", "run", "dev"]
