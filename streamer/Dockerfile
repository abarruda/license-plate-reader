FROM resin/rpi-raspbian:stretch

RUN apt-get update && apt-get upgrade
RUN apt-get install -y cmake libjpeg8-dev git
RUN apt-get install -y build-essential

WORKDIR /
COPY opt_vc.tar.gz /
RUN tar -xzvf opt_vc.tar.gz

RUN git clone https://github.com/jacksonliam/mjpg-streamer
WORKDIR /mjpg-streamer/mjpg-streamer-experimental

RUN make
RUN make install

EXPOSE 80

CMD ./mjpg_streamer -o "output_http.so -w ./www -p 80" -i "input_raspicam.so"
