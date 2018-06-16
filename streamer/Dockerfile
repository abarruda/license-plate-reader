FROM resin/rpi-raspbian:stretch

# consider moving to https://github.com/datarhei/restreamer

RUN apt-get update && apt-get upgrade --assume-yes
RUN apt-get install -y cmake libjpeg8-dev git
RUN apt-get install -y build-essential
RUN apt-get install -y libraspberrypi-bin 

#RUN usermod -a -G video root

WORKDIR /
COPY opt_vc_include.tar.gz /
RUN tar -xzvf opt_vc_include.tar.gz

RUN git clone https://github.com/jacksonliam/mjpg-streamer
WORKDIR /mjpg-streamer/mjpg-streamer-experimental

RUN make -j "$(nproc)"
RUN make install

EXPOSE 80

CMD ./mjpg_streamer -o "output_http.so -w ./www -p 80" -i "input_raspicam.so"