import sys, os
from flask import Flask, jsonify, request, current_app
from werkzeug import secure_filename
from api_utils import crossdomain
import uuid
import alpr_utils 

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/tmp/lp_upload'
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
		region = request.form['state']
		if file and allowed_file(file.filename):
			id = str(uuid.uuid4())
			filePath = os.path.join(app.config['UPLOAD_FOLDER'], id)
			file.save(filePath)
			plate, confidence = alpr_utils.analyze(region, filePath)
			responseDict = {'id': id, 'prediction': plate, 'confidence': confidence, 'seen': False, 'times': 0}
			return jsonify(responseDict)
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