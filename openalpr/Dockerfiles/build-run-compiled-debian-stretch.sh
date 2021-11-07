#!/bin/bash

set -e

docker build -t openalpr:compiled-stretch-armv7 -f Dockerfile-compiled-debian-stretch --platform linux/arm/v7 ../.

# docker run \
#   --name openalpr \
#   -it \
#   --rm  \
#   -v $(dirname `pwd`)/alprd.conf:/etc/openalpr/alprd.conf \
#   openalpr:compiled-stretch-armv7