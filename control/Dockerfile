FROM resin/rpi-raspbian

RUN apt-get update && apt-get upgrade --assume-yes

RUN apt-get install --assume-yes nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
