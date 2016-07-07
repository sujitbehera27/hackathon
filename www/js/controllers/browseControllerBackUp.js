myApp.controller('browseController', function($scope, $state, $cordovaGeolocation,mapsService) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    mapsService.getStoreInfoData().then(function (results) {
      console.log(results);
  		try{
  		if(results.storeInfo.length==0){
  			console.log("error in getting data");;
  		}
  		if(results==""){
  			console.log("no data");
  		}else{
  		$scope.locations = results.storeInfo;
  		}
  		}catch(e){
  			console.log(e);
  		}
  	}, function(e){
  	console.log(e);
  	});
    
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    }, function(error){
      console.log("Could not get location");
    });
});
})
