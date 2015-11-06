(function(){
	"use strict";

	var request = require('./request');

	function FeaturedGames(baseURL, auth, region){
		this.auth = auth;
		this.region = region;
		this.baseURL = baseURL;
	}

	FeaturedGames.prototype = {
		get: function(){
			var data = request.get(this.baseURL + "/observer-mode/rest/featured?api_key=" + this.auth);
			return data.gameList;
		}
	}

	module.exports = {
		FeaturedGames: FeaturedGames
	}

})();