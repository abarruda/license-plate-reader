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
            imageVisible: {display: 'none'}
            };
    },

    performUpload: function() {

    },

    hiddenImageInputHandler: function(input) {
    	var hiddenImageInput = input.target;
    	if (hiddenImageInput.files && hiddenImageInput.files[0]) {
    		var self = this;
    		self.setState({showImagePreview: true});
    		
    		var reader = new FileReader();
    		// When the file reader is loaded, set the image preview
    		reader.onload = function (e) {
    			self.setState({imagePreview: e.target.result, showImagePreview: true})
    		};

    		// Reference the file
    		var file = input.target.files[0];
    		// Clear the hidden input's value so we can scan another image later
    		input.target.value = "";
    		// read the file selected
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
						<ProgressBar label={"Analyzing"} now={100} active />
						<img id="upload_image" src={this.state.imagePreview} alt="image" style={{width: '100%'}}/>
					</Modal.Body>
				</Modal>
				<br />
				
				<input id="hiddenImageInput" type="file" accept="image/*" capture="camera"
					onChange={this.hiddenImageInputHandler} style={{display:'none'}}
					name="hiddenImageInput" ref="hiddenImageInput" /> 

				<Button bsStyle="success" onClick={this.handleScanClick}>Scan Plate</Button>
			</div>
			);
	}
});

module.exports = PhotoUploadComponent