FROM ubuntu

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
RUN cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
RUN make -j "$(nproc)" VERBOSE=1
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
RUN make -j "$(nproc)" && make install

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
RUN make -j "$(nproc)" && make install
RUN ldconfig

###############
# openALPR ###
###############

RUN apt-get update && apt-get install --assume-yes \
  liblog4cplus-dev \
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
RUN make -j "$(nproc)"
RUN make install

COPY alprd.conf /etc/openalpr/alprd.conf

WORKDIR /
COPY entrypoint.sh /entrypoint.sh

CMD sh entrypoint.sh