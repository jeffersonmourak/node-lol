(function(){
	"use strict";

	var request = require('sync-request');

	function get(url){
		var response = request('GET', url);
		if(response.statusCode == 200){
			var body = response.getBody('utf8');
			return JSON.parse(body);
		}
		else{
			return false;
		}
	}

	module.exports = {
		get: get,
	}

})();