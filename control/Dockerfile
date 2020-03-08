FROM ubuntu
FROM balenalib/generic-armv7ahf-ubuntu:xenial

#RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen
#ENV LANG en_US.UTF-8

RUN apt-get update && apt-get upgrade --assume-yes

RUN apt-get install --assume-yes nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
