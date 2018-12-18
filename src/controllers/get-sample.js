'use strict';
const fs = require('fs');
const response = require('../models/response');
const mockResponse = require('../responses/sample-response');

const fetchmockResponse = function () {
	try {
		return JSON.stringify(mockResponse, null, 4);
	} catch (ex) {
		return [];
	}
};

function retrieveMockResponse(req, res) {
	const categories = fetchmockResponse();
	if (categories && JSON.parse(categories).length > 0) {
		res.type('json')
		.status(200)
		.send(categories);
	} else {
		res.type('json')
		.status(500)
		.send(response(500, 'Unable to retrieve!'));
	}

}

module.exports = retrieveMockResponse;
