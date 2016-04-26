from flask import Flask, jsonify, request
from api_utils import crossdomain

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
@crossdomain(origin='*')
def upload(file):
	print "File upload";

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=10111, debug=True)