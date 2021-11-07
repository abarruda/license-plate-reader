FROM debian:buster-slim

RUN apt-get update && apt-get install -y \
openalpr \
openalpr-daemon \
openalpr-utils \
libopenalpr-dev \
beanstalkd

RUN cp /usr/share/openalpr/runtime_data/ocr/tessdata/* /usr/share/openalpr/runtime_data/ocr/.

COPY entrypoint.sh /entrypoint.sh

CMD sh entrypoint.sh