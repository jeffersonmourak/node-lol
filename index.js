(function(){
	"use strict";

	var Player = require('./core/player');
	var Games = require('./core/games');

	function leagueOfLegends(apiKey,region){
		this.auth = apiKey;
		this.region = region;
		this.baseURL = "https://" + region + ".api.pvp.net";
		this.player = new Player(this.baseURL, this.auth, this.region);
		this.featuredGames = new Games.FeaturedGames(this.baseURL, this.auth, this.region);
	}

	leagueOfLegends.prototype = {
		setRegion: function(region){
			this.region = region;
			this.player = new Player(this.baseURL, this.auth, this.region);
			this.featuredGames = new Games.FeaturedGames(this.baseURL, this.auth, this.region);
		},
		setApiKey: function(apiKey){
			this.auth = apiKey;
			this.player = new Player(this.baseURL, this.auth, this.region);
			this.featuredGames = new Games.FeaturedGames(this.baseURL, this.auth, this.region);
		}
	}

})();