myApp.factory('speechService', function ($rootScope, $http) {
	return {
		getSpeechData: function (param) {
			// console.log($rootScope.ConfigHandler + '/getNotification/' + param);
			return $http.get("speech.json")
				.then(function (result) {
					// console.log(result.data);
					try{
					speechInfo = result.data;
					var speechInfo = {
						"speechInfo": speechInfo
					};
					}
					catch(e){
					return ""
					}
					return speechInfo;
				});
		},

		getCardData: function (param) {
			// console.log($rootScope.ConfigHandler + '/getNotification/' + param);
			return $http.get("cardsData.json")
				.then(function (result) {
					// console.log(result.data);
					try{
					cardData = result.data;
					var cardData = {
						"cardData": cardData
					};
					}
					catch(e){
					return ""
					}
					return cardData;
				});
		},
	}
});
