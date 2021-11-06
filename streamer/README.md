# streamer

The streamer is used to provide imagery to the license plate detection component.  It uses the light weight [mjpeg-streamer](https://github.com/jacksonliam/mjpg-streamer) fork for Raspberry Pi [raspicam](https://github.com/jacksonliam/mjpg-streamer/blob/master/mjpg-streamer-experimental/plugins/input_raspicam/README.md).

## Building
This streamer build specifically uses the Raspberry Pi Raspicam input plugin.  A Raspberry Pi is required to build this image, as it requires Raspicam libraries to build the mjpeg-streamer binaries.

## Configuration
Some parameters provided to the raspicam input plugin can be configured via environment variables:

`STREAMER_FPS` - framerate

`STREAMER_QUALITY` - quality

`STREAMER_WIDTH` - image width

`STREAMER_HEIGHT` - image height

`STREAMER_USE_STILLS` - Use image stills instead of video

[(mode details found here)](https://github.com/jacksonliam/mjpg-streamer/blob/master/mjpg-streamer-experimental/plugins/input_raspicam/README.md#instructions)

## Run
The streamer needs access to the video device and libraries that exist in the Raspbian OS.  See the `docker-build-run.sh` script for details.