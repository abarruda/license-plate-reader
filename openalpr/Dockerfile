#FROM ubuntu
#FROM balenalib/generic-armv7ahf-ubuntu:xenial
FROM balenalib/generic-armv7ahf-debian:stretch AS builder

ARG compileCores=1

###############
# opencv ######
###############

RUN apt-get update && apt-get upgrade --assume-yes
RUN apt-get install --assume-yes apt-utils 
RUN apt-get install --assume-yes wget
RUN apt-get install --assume-yes build-essential
RUN apt-get install --assume-yes cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
RUN apt-get install --assume-yes python-dev python-numpy
RUN apt-get install --assume-yes libtbb2 libtbb-dev
RUN apt-get install --assume-yes libjpeg-dev libpng-dev libtiff-dev libdc1394-22-dev

RUN wget -q https://github.com/opencv/opencv/archive/3.4.1.tar.gz
RUN tar -xf 3.4.1.tar.gz
WORKDIR opencv-3.4.1
RUN mkdir release
WORKDIR release
RUN echo "*** # cores used for build: $compileCores ***"
RUN cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
RUN make -j $compileCores VERBOSE=1
RUN make install
RUN rm -r /opencv-3.4.1

###############
# leptonica ###
###############

WORKDIR /
RUN wget -q http://www.leptonica.org/source/leptonica-1.76.0.tar.gz
RUN tar -xf leptonica-1.76.0.tar.gz
WORKDIR leptonica-1.76.0
RUN ./configure --prefix=/usr/local
RUN make -j $compileCores && make install

###############
# tesseract ###
###############

RUN apt-get install --assume-yes \
  autoconf automake libtool \
  autoconf-archive pkg-config \
  libpng-dev libtiff5-dev zlib1g-dev

WORKDIR /
RUN wget -q https://github.com/tesseract-ocr/tesseract/archive/3.05.00.tar.gz
RUN tar -xf 3.05.00.tar.gz
WORKDIR tesseract-3.05.00
#RUN wget -q https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata
#RUN mv eng.traineddata tessdata/.

ENV LD_LIBRARY_PATH=/usr/local/lib

RUN ./autogen.sh
RUN ./configure
RUN make -j $compileCores && make install
RUN ldconfig

###############
# log4cplus ###
###############

WORKDIR /
RUN wget -q https://github.com/log4cplus/log4cplus/releases/download/REL_2_0_0/log4cplus-2.0.0.tar.gz
RUN tar -xf log4cplus-2.0.0.tar.gz
WORKDIR log4cplus-2.0.0
RUN echo "set(CMAKE_CXX_STANDARD 11)" | cat - CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp CMakeLists.txt
RUN echo "set(CMAKE_CXX_STANDARD_REQUIRED ON)" | cat - CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp CMakeLists.txt
RUN echo "set(CMAKE_CXX_EXTENSIONS OFF)" | cat - CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp CMakeLists.txt
RUN cmake ./
RUN make 
RUN make install

###############
# openALPR ###
###############

RUN apt-get update && apt-get install --assume-yes \
#  liblog4cplus-dev \
  beanstalkd \
  libcurl4-openssl-dev

# Necessary for java bindings:
#RUN apt-get update && apt-get install --assume-yes \
#  openjdk-8-jdk
#ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-armhf

WORKDIR /
RUN wget -q https://github.com/openalpr/openalpr/archive/v2.3.0.tar.gz
RUN tar -xf v2.3.0.tar.gz
WORKDIR openalpr-2.3.0
RUN echo "SET(OpenCV_DIR \"/usr/local/lib\")" >> src/CMakeLists.txt
RUN echo "SET(Tesseract_DIR \"/tesseract-ocr\")" >> src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_STANDARD 11)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_STANDARD_REQUIRED ON)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_EXTENSIONS OFF)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt

WORKDIR /openalpr-2.3.0/src
RUN cmake ./
RUN echo "compileCores: $compileCores"
RUN make -j $compileCores
RUN make install

FROM balenalib/generic-armv7ahf-debian:stretch AS alpr
COPY --from=builder /usr/local /usr/local
COPY --from=builder /usr/bin/beanstalkd /usr/bin/beanstalkd

RUN apt-get update && apt-get install --assume-yes \
  libpng16-16 \
  libjpeg62-turbo \
  libtiff5 \
  libgtk2.0-0 \
  libdc1394-22 \
  libavcodec57 \
  libavformat57 \
  libswscale4

COPY alprd.conf /etc/openalpr/alprd.conf

WORKDIR /
COPY entrypoint.sh /entrypoint.sh
ENV LD_LIBRARY_PATH=/usr/local/lib

COPY --from=builder /etc/openalpr/openalpr.conf /etc/openalpr/openalpr.conf

CMD sh entrypoint.sh
