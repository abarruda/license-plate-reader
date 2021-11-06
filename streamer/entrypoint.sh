#!/bin/bash

set -x

fps="${STREAMER_FPS:-15}"
quality="${STREAMER_QUALITY:-85}"
width="${STREAMER_WIDTH:-640}"
height="${STREAMER_HEIGHT:-480}"
usestills="${STREAMER_USE_STILLS:-FALSE}"

option_use_stills=""

if [ $usestills = "TRUE" ]; then
	option_use_stills="-usestills"
fi

./mjpg_streamer -o "output_http.so -w ./www -p 80" -i "input_raspicam.so -x ${width} -y ${height} -fps ${fps} -quality ${quality} ${option_use_stills}"