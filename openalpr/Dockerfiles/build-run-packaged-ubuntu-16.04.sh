#!/bin/bash

set -e

docker build -t openalpr:packaged-ubuntu16.04-armv7 -f Dockerfile-packaged-ubuntu-16.04 --platform linux/arm/v7 ../.

# docker run \
#   --name openalpr \
#   -it \
#   --rm  \
#   -v $(dirname `pwd`)/alprd.conf:/etc/openalpr/alprd.conf \
#   openalpr:packaged-ubuntu16.04-armv7