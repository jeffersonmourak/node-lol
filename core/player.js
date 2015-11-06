(function(){
	"use strict";

	var request = require('./request');

	function Player(baseURL, auth, region){
		this.auth = auth;
		this.region = region;
		this.baseURL = baseURL;
	}

	function getCommonData(url){
		var data = request.get(url);
		var keyName = Object.keys(data)[0];
		return data[keyName];
	}

	Player.prototype = {
		get: function(key){
			var isANumber = isNaN(key) === false;
			if(isANumber){
				var player = request.get(this.baseURL + "/api/lol/" + this.region + "/v1.4/summoner/" + key +"/?api_key=" + this.auth);
			}
			else{
				var player = request.get(this.baseURL + "/api/lol/" + this.region + "/v1.4/summoner/by-name/" + key +"/?api_key=" + this.auth);
			}
			var keyName = Object.keys(player)[0];
			var playerData = player[keyName];
			this.id = playerData.id;
			playerData._instance = this;
			playerData.masteries = this.getMasteries;
			playerData.runes = this.getRunes;
			playerData.summary = this.getSummary;
			return playerData;
		},
		getMasteries: function(playerID){
			if(!playerID){
				playerID = this.id;
				this.baseURL = this._instance.baseURL;
				this.region = this._instance.region;
				this.auth = this._instance.auth;
			}
			var player = request.get(this.baseURL + "/api/lol/" + this.region + "/v1.4/summoner/" + playerID +"/masteries?api_key=" + this.auth);
			var keyName = Object.keys(player)[0];
			var playerData = player[keyName];
			return playerData.pages;
		},
		getRunes: function(playerID){
			if(!playerID){
				playerID = this.id;
				this.baseURL = this._instance.baseURL;
				this.region = this._instance.region;
				this.auth = this._instance.auth;
			}
			var player = request.get(this.baseURL + "/api/lol/" + this.region + "/v1.4/summoner/" + playerID +"/runes?api_key=" + this.auth);
			var keyName = Object.keys(player)[0];
			var playerData = player[keyName];
			return playerData.pages;
		},
		getSummary: function(playerID){
			if(!playerID){
				playerID = this.id;
				this.baseURL = this._instance.baseURL;
				this.region = this._instance.region;
				this.auth = this._instance.auth;
			}
			var player = request.get(this.baseURL + "/api/lol/" + this.region + "/v1.3/stats/by-summoner/" + playerID +"/summary?api_key=" + this.auth);
			return player.playerStatSummaries;

		}
	}

	module.exports = Player;

})();