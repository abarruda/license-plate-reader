"use strict";
var $ = require('jquery');
var React = require('react');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var SplitButton = require('react-bootstrap').SplitButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;	
var Image = require('react-bootstrap').Image;
var Label = require('react-bootstrap').Label;
var Modal = require('react-bootstrap').Modal;
var Panel = require('react-bootstrap').Panel;
var ProgressBar = require('react-bootstrap').ProgressBar;
var Row = require('react-bootstrap').Row;
var StateDropDownComponent = require('./StateDropDownComponent.jsx');

var PhotoUploadComponent = React.createClass({

	getInitialState: function() {
        return {
        	showUploadAnalysisModal: false,
            imagePreview: "#",
            imageVisible: {display: 'none'},
            progressBarActive: true,
            progressBarPercent: 0,
            progressBarStyle: null,
            progressBarText: "",
            platePrediction: null,
            predictionConfidence: 0,
            confirmationDisplayStyle: {display:'none'},
            correctButtonDisabled: false,
            tryAgainButtonDisabled: false,
            wrongButtonDisabled: false,
            stateSelect: "ca"
            };
    },

    updateProgressBarState: function(active, percent, style, text) {
    	this.setState({
    		progressBarActive: active, 
    		progressBarPercent: percent,
    		progressBarStyle: style,
    		progressBarText: text
    	});
    },

    uploadProgress: function(e) {
    	var done = e.position || e.loaded, total = e.totalSize || e.total;
    	var percentDone = Math.round(Math.floor(done/total*1000)/10);
		
		if (percentDone < 100) {
			this.updateProgressBarState(true, percentDone, null, "Uploading image...");
		} else {
			this.updateProgressBarState(true, 100, "info", "Analyzing image...");
		}
		
    },

    receivedResponse: function(e) {
    	var analysisResult = JSON.parse(e.target.response);
    	var progressBarText = "Analysis Complete: " + Math.round(analysisResult['confidence']) + "% confidence"
    	this.updateProgressBarState(false, 100, "success", progressBarText);
    	
    	this.setState({
    		analysisResult: analysisResult,
    		platePrediction: analysisResult['prediction'], 
    		predictionConfidence: analysisResult['confidence'],
    		confirmationDisplayStyle: {}
    	});
    },

    onUploadError: function(e) {
    	this.updateProgressBarState(false, 100, "danger", "Error!");
    	this.setState({
    		platePrediction: "ERROR READING PLATE",
    		correctButtonDisabled: true,
    		confirmationDisplayStyle: {}
    	});
    },

    performUpload: function(file) {
    	var xhr = new XMLHttpRequest();
    	// must use xhr.upload.onprogress instead of xhr.onprogress to track file upload!
    	xhr.upload.onprogress = this.uploadProgress;
        xhr.onreadystatechange = this.onReadyStateChange;
        xhr.onload = this.receivedResponse;
        xhr.onerror = this.onUploadError;

        xhr.open('POST', "http://192.168.1.220:10111/upload", true);
        // Adding the following header breaks upload.  Possibly redundant from the form html??
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");

        var formData = new FormData();
        formData.append("imageFile", file);
        formData.append("state", this.state.stateSelect);
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
    			self.setState({imagePreview: e.target.result, showUploadAnalysisModal: true})
    		};

    		// read the file selected
    		this.performUpload(file);
    		reader.readAsDataURL(file);
    		
    	}
    	
    },

	handleCorrectButton: function() {
		alert("ID: " + this.state.analysisResult['id']);
    },

    handleTryAgainButton: function() {
    	var currentState = this.state.stateSelect;
    	this.setState(this.getInitialState());
    	this.setState({stateSelect: currentState});
    	this.refs.hiddenImageInput.click();
    },

    handleWrongButton: function() {
    	// Pop up modal to manually enter in state
    },

    renderAnalysisResult: function() {
    	if (this.state.platePrediction === "") {
    		return "";
    	} else {
    		return (
    			<div style={{fontSize: 20}}>{this.state.platePrediction}</div>	
    			);
    	}
    },

    handleStateDropDownSelect: function(e) {
    	this.setState({stateSelect: e.target.value.toLowerCase()});
    },

    handleScanClick: function(e) {
    	// mimic a click on the image input "choose file" button
    	this.refs.hiddenImageInput.click();
    },

	render: function() {
		return (
			<div>
				<Modal show={this.state.showUploadAnalysisModal}>
					<Modal.Body>
                        
                        <Grid fluid>
                        	<Row>
                        		<Col xs={12}>
                        			<Image id="upload_image" src={this.state.imagePreview} responsive />
                        			<br />
                        		</Col>
                        	</Row>
                            <Row>
                                <Col xs={2}>
                                    <b>Status</b>
                                </Col>
                                <Col xs={10}>
                                    <ProgressBar label={this.state.progressBarText} now={this.state.progressBarPercent} 
                                        active={this.state.progressBarActive} bsStyle={this.state.progressBarStyle} />
                                </Col>
                            </Row>
                            <Row>
                            	<Col xs={2}>
                            		<b>Plate</b>
                            	</Col>
                            	<Col xsOffset={3} xs={6}>
                            		{this.renderAnalysisResult()}
                            	</Col>
                            </Row>
                            <Row><Col>&nbsp;</Col></Row>
                            <Row><Col>&nbsp;</Col></Row>
                            <Row style={this.state.confirmationDisplayStyle}>
                            	<Col xs={2} />
                            	<Col xs={10}>
                            		<ButtonToolbar>
	                            		<Button bsStyle="success" onClick={this.handleCorrectButton} disabled={this.state.correctButtonDisabled}>
	                            			Correct
	                            		</Button>
	                            		<Button bsStyle="warning" onClick={this.handleTryAgainButton} disabled={this.state.tryAgainButtonDisabled}>Try Again</Button>
	                            		<Button bsStyle="danger" onClick={this.handleWrongButton} disabled={this.state.wrongButtonDisabled}>Wrong</Button>
                            		</ButtonToolbar>
                            	</Col>
                            </Row>
                        </Grid>
                        
					</Modal.Body>
				</Modal>
				<br />
				<StateDropDownComponent onSelect={this.handleStateDropDownSelect}/>
				<form method="POST" encType="multipart/form-data">
					<input id="hiddenImageInput" type="file" accept="image/*" capture="camera"
						onChange={this.hiddenImageInputHandler} style={{display:'none'}}
						name="hiddenImageInput" ref="hiddenImageInput" /> 
				</form>
				<Button block bsStyle="success" bsSize="large" onClick={this.handleScanClick}>Scan Plate</Button>
			</div>
		);
	}
});

module.exports = PhotoUploadComponent