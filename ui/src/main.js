"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Col = require('react-bootstrap').Col;
var PageHeader = require('react-bootstrap').PageHeader;
var Tab = require('react-bootstrap').Tab;
var Tabs = require('react-bootstrap').Tabs;
var PhotoUploadComponent = require('./components/PhotoUploadComponent.jsx');

var Enclosure = React.createClass({
	render: function() {
		return (
			<div className="container-fluid" ref="parentContainer">				
				<div className="row">
					<div className="col-sm-4">
						<PageHeader>Plate Scanner</PageHeader>
						<Tabs id="ActionSelector" defaultActiveKey={1}>
							<Tab eventKey={1} title="Scanner">
								<PhotoUploadComponent />
							</Tab>
							<Tab eventKey={2} title="History">
							HISTORY!
							</Tab>
						</Tabs>
						
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Enclosure />, document.getElementById('app'));

module.exports = Enclosure;