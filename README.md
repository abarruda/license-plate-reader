### Build (arm v6)
	docker-compose -f docker-compose-armv6.yaml build

### References

[openalpr](https://github.com/openalpr/openalpr)

[Compilation instructions](https://github.com/openalpr/openalpr/wiki/Compilation-instructions-(Ubuntu-Linux))

### Notes & Brainstorming
- MJPEG Streamer
	- On Raspberry Pi B, [disable](https://forums.raspberrypi.com/viewtopic.php?t=61665) power management for Edimax Wifi adapter 
	- Performant camera configurations:
	```conf
  STREAMER_FPS=3
  STREAMER_QUALITY=10
  STREAMER_WIDTH=1296
  STREAMER_HEIGHT=972
	```
	- [More details](https://picamera.readthedocs.io/en/release-1.3/fov.html#camera-modes) on camera modes
- Wyze Cam RTSP supported as stream in `alprd.conf`:
    ```conf
	stream = rtsp://{user}:${password}@{ip}/live
    ```
	- Stream processing CPU usage becomes very high when "night vision"/infrared mode is enabled (5+)
	- [Possibly improve RTSP performance with gstreamer](https://groups.google.com/g/openalpr/c/BWjjVMRh_rI/m/SYmgBMEgBwAJ)
	- curl RTSP:
		```bash
		curl -vvv -X OPTIONS http://${user}:${password}@{ip}:554/live RTSP/1.0
		```
- [`analysis_threads`](https://discuss.openalpr.com/t/till-which-speed-of-the-car-does-the-software-read-the-number-plates/170/5) config seems to exist but unclear if is respected on Pi deployments