'use strict';
const response = function (code, message) {
	return {
		"code": code,
		"message": message
	}
};

module.exports = response;
