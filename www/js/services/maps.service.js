myApp.factory('mapsService', function ($rootScope, $http) {
	return {
		getStoreInfoData: function (param) {
			// console.log($rootScope.ConfigHandler + '/getNotification/' + param);
			return $http.get("store-locations.json")
				.then(function (result) {
					// console.log(result.data);
					try{
					storeInfo = result.data;
					var storeInfo = {
						"storeInfo": storeInfo
					};
					}
					catch(e){
					return ""
					}
					return storeInfo;
				});
		},
	}
});
