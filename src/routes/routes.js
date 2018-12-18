'use strict';
const retrieveDemoGet = require('../controllers/get-sample');

const routes = function (app) {
	app.route('/demo')
	.get(retrieveDemoGet);
};

module.exports = routes;
