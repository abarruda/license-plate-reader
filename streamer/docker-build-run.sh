#!/bin/bash

set -e

# this file bundles /opt/vc for accessing in the docker build container
tar -zcvf opt_vc_include.tar.gz /opt/vc/include

docker build -t streamer-armv6:v1.0.0-armv6 .

docker run \
  --name mjpg-streamer \
  -it \
  --rm \
  --device=/dev/vchiq \
  -v /opt/vc:/opt/vc \
  -p 80:80 \
  -e STREAMER_FPS=2 \
  -e STREAMER_QUALITY=10 \
  streamer-armv6:v1.0.0 