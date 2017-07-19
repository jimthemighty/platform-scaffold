# General advice:
#
# Installing software such as using `apt-get` will store temporary and cached
# data. This bloats the Docker image and should be avoided at all costs. Please
# ensure that for every instruction in this file you clean up within the same
# command. E.g. for `apt-get`, simply add `&& apt-get clean` at the very end.
#
# Documentation on the Dockerfile syntax is available here:
# https://docs.docker.com/reference/builder/
FROM openjdk:8-jdk
MAINTAINER Mobify <ops@mobify.com>

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.11.0
ENV YARN_VERSION 0.24.6

USER root

#   -> Install additional packages:
RUN apt-get update && apt-get install -yf apt-utils \
                                          netcat nano \
                                          libnss3-tools \
                                          xvnc4viewer vnc4server \
                                          xvnc4viewer \
                                          curl wget unzip git \
                                          unzip xvfb && \
    apt-get update --fix-missing && apt-get -yf upgrade 

# Install Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
# Update Chrome
RUN \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    apt-get update \
    apt-get --fix-broken install google-chrome-stable

RUN apt-get update && apt-get install libnss3-tools 

# Install node 6
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - &&\
  apt-get install -y nodejs

# Accept SSL Cert
# Initialize database of certificates
RUN mkdir -p $HOME/.pki/nssdb
# Pass in a password
RUN certutil -d $HOME/.pki/nssdb -N --empty-password
# Add self-signed SSL certificate
RUN pwd
RUN certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n localhost.pem -i localhost.pem

ENV DISPLAY :99

# Install Xvfb init script
ADD xvfb_init /etc/init.d/xvfb
RUN chmod a+x /etc/init.d/xvfb
ADD xvfb-daemon-run /usr/bin/xvfb-daemon-run
RUN chmod a+x /usr/bin/xvfb-daemon-run

# Allow root to execute Google Chrome by replacing launch script
ADD google-chrome-launcher /usr/bin/google-chrome
RUN chmod a+x /usr/bin/google-chrome
CMD [ "bash" ]