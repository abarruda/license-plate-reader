FROM resin/rpi-raspbian
#FROM arm32v6/alpine

###############
# opencv ######
###############

RUN apt-get update && apt-get upgrade --assume-yes
RUN apt-get install --assume-yes apt-utils 
RUN apt-get install --assume-yes wget
RUN apt-get install --assume-yes build-essential
RUN apt-get install --assume-yes cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
RUN apt-get install --assume-yes python-dev python-numpy
  #libtbb2 \
  #libtbb-dev \
RUN apt-get install --assume-yes libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev

RUN wget -q https://github.com/opencv/opencv/archive/3.4.1.tar.gz
RUN tar -xf 3.4.1.tar.gz
WORKDIR opencv-3.4.1
RUN mkdir release
WORKDIR release
RUN cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB:BOOL=FALSE .. 
RUN make VERBOSE=1
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
RUN make && make install

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
RUN make && make install
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
  libpng12-dev \
  libtiff5-dev \
  zlib1g-dev \
  libcurl4-openssl-dev \
  build-essential \
  autoconf \
  automake \
  libtool \
  git-core \
  cmake \
  openjdk-8-jdk \
  vim

WORKDIR /
#RUN git clone https://github.com/openalpr/openalpr.git
RUN wget -q https://github.com/openalpr/openalpr/archive/v2.3.0.tar.gz
RUN tar -xf v2.3.0.tar.gz
WORKDIR openalpr-2.3.0
RUN echo "SET(OpenCV_DIR \"/usr/local/lib\")" >> src/CMakeLists.txt
RUN echo "SET(Tesseract_DIR \"/tesseract-ocr\")" >> src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_STANDARD 11)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_STANDARD_REQUIRED ON)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt
RUN echo "set(CMAKE_CXX_EXTENSIONS OFF)" | cat - src/CMakeLists.txt > CMakeLists.txt.tmp && mv CMakeLists.txt.tmp src/CMakeLists.txt

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-armhf

WORKDIR /openalpr-2.3.0/src
RUN cmake ./
RUN make
RUN make install

COPY alprd.conf /etc/openalpr/alprd.conf

RUN apt-get install -y beanstalkd

WORKDIR /
COPY entrypoint.sh /entrypoint.sh

CMD sh entrypoint.sh
