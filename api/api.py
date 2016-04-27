import sys
from flask import Flask, jsonify, request, current_app
import time
from api_utils import crossdomain

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/tmp'
app.config['MAX_CONTENT_LENGTH'] = 512 * 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
@crossdomain(origin='*')
def upload():
	print str(request)
	try:
		print "form: " + str(request.form)
		print "files: " + str(request.files)
		file = request.files['imageFile']
		if file and allowed_file(file.filename):
			time.sleep(10)
			return file.filename
		time.sleep(20)
		return "cool"
	except TypeError as e:
		print str(e)

@app.route('/upload', methods=['OPTIONS'])
@crossdomain(origin='*')
def upload_options():
	print "OPTIONS CALL"
	return current_app.make_default_options_response()

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=10111, debug=True)