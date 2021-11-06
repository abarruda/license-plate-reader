FROM resin/rpi-raspbian:stretch

# --allow-unauthenticated needed below for non RPI builds/testing
RUN apt-get update && apt-get install -y cmake libjpeg62-turbo-dev git build-essential libraspberrypi-bin

WORKDIR /
COPY opt_vc_include.tar.gz /
RUN tar -xzvf opt_vc_include.tar.gz

RUN curl -o mjpeg-streamer-v1.0.0.tar.gz https://codeload.github.com/jacksonliam/mjpg-streamer/tar.gz/refs/tags/v1.0.0
RUN tar -zxvf mjpeg-streamer-v1.0.0.tar.gz

WORKDIR /mjpg-streamer-1.0.0/mjpg-streamer-experimental
RUN make -j "$(nproc)"
RUN make install

EXPOSE 80

COPY entrypoint.sh /mjpg-streamer-1.0.0/mjpg-streamer-experimental/entrypoint.sh
CMD /mjpg-streamer-1.0.0/mjpg-streamer-experimental/entrypoint.sh