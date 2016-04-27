"use strict";
var $ = require('jquery');
var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var ProgressBar = require('react-bootstrap').ProgressBar;

var PhotoUploadComponent = React.createClass({

	getInitialState: function() {
        return {
            imagePreview: "#",
            imageVisible: {display: 'none'},
            progressBarActive: true,
            progressBarPercent: 0,
            progressBarText: ""
            
            };
    },

    uploadProgress: function(e) {
    	var done = e.position || e.loaded, total = e.totalSize || e.total;
    	var percentDone = Math.round(Math.floor(done/total*1000)/10);
		
		if (percentDone < 100) {
			this.setState({progressBarPercent: percentDone, progressBarText: "Uploading..."});
		} else {
			this.setState({progressBarPercent: 100, progressBarText: "Analyzing..."});
		}
		
    	//console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + percentDone + '%');
    },

    receivedResponse: function(e) {
    	this.setState({progressBarText: "Complete: " + e.target.response, progressBarActive: false});
    	console.log('response received: ' + e.target.response);
    },

    onReadyStateChange: function(e) {
    	//console.log('onReadyStateChange: ' + e.target.readyState);
    	//console.log(e);
    },

    performUpload: function(file) {
    	
    	var xhr = new XMLHttpRequest();
    	// must use xhr.upload.onprogress instead of xhr.onprogress to track file upload!
    	xhr.upload.onprogress = this.uploadProgress;
        xhr.onreadystatechange = this.onReadyStateChange;
        xhr.onload = this.receivedResponse;

        xhr.open('POST', "http://192.168.1.220:10111/upload", true);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        
        //xhr.setRequestHeader("X-File-Name", file.name);
        //xhr.setRequestHeader("X-File-Type", file.type);

        var formData = new FormData();
        formData.append("thefile", file);
        xhr.send(formData);
    },

    hiddenImageInputHandler: function(input) {
    	var hiddenImageInput = input.target;
    	if (hiddenImageInput.files && hiddenImageInput.files[0]) {
    		var self = this;
    		
    		// Reference the file
    		var file = hiddenImageInput.files[0];
    		// Clear the hidden input's value so we can scan another image later
    		input.target.value = "";
    		
    		var reader = new FileReader();
    		// When the file reader is loaded, set the image preview
    		reader.onload = function (e) {
    			self.setState({imagePreview: e.target.result, showImagePreview: true})
    		};

    		// read the file selected
    		this.performUpload(file);
    		reader.readAsDataURL(file);
    		
    	}
    	
    },

    handleScanClick: function(e) {
    	// mimic a click on the image input "choose file" button
    	this.refs.hiddenImageInput.click();
    },

	render: function() {
		return (
			<div>
				<Modal show={this.state.showImagePreview}>
					<Modal.Body>
						<ProgressBar label={this.state.progressBarText} now={this.state.progressBarPercent} 
							active={this.state.progressBarActive} />
						<img id="upload_image" src={this.state.imagePreview} alt="image" style={{width: '50%'}}/>
					</Modal.Body>
				</Modal>
				<br />
				
				<form method="POST" encType="multipart/form-data">
					<input id="hiddenImageInput" type="file" accept="image/*" capture="camera"
						onChange={this.hiddenImageInputHandler} style={{display:'none'}}
						name="hiddenImageInput" ref="hiddenImageInput" /> 
				</form>

				<Button bsStyle="success" onClick={this.handleScanClick}>Scan Plate</Button>
			</div>
			);
	}
});

module.exports = PhotoUploadComponent