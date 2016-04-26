"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Col = require('react-bootstrap').Col;
var PageHeader = require('react-bootstrap').PageHeader;
var PhotoUploadComponent = require('./components/PhotoUploadComponent.jsx');

var Enclosure = React.createClass({
	render: function() {
		return (
			<div className="container-fluid" ref="parentContainer">				
				<div className="row">
					<div className="col-sm-4">
						<PageHeader>Scan Plate</PageHeader>
						<PhotoUploadComponent />
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Enclosure />, document.getElementById('app'));

module.exports = Enclosure;