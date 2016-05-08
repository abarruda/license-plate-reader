import time
from openalpr import Alpr

alpr = Alpr("us", "/etc/openalpr/openalpr.conf", "/usr/local/share/openalpr/runtime_data")
if not alpr.is_loaded():
	print("Error loading OpenALPR")
else:
	print ("OpenALPR loaded..")
alpr.set_top_n(1)
alpr.set_detect_region(False)

def analyze(region, file):
	print "region: " + region
	print "Analyzing " + file
	alpr.set_default_region(region)
	image_bytes = open(file, "rb").read()
	results = alpr.recognize_array(image_bytes)
	if not results['results']:
		print "couldn't detect license plate"
		return None
	else:
		print results['results']
		resultCandidate = results['results'][0]	
		return resultCandidate['plate'], resultCandidate['confidence']