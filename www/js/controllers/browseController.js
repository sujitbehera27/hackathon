myApp.controller('browseController', function($scope, $state, $cordovaGeolocation,mapsService) {
  var vm =this;
  $scope.regions = [];
  $scope.markets = [];
    vm.markerFunction = function(){
    for (i = 0; i < $scope.locations.length; i++){
        createMarker($scope.locations[i]);
    }
    }
    var options = {timeout: 10000, enableHighAccuracy: true};
    $scope.initialize = function(){
      mapsService.getStoreInfoData().then(function (results) {
        console.log(results);
    		try{
    		if(results.storeInfo.length==0){
    			console.log("error in getting data");
    		}
    		if(results==""){
    			console.log("no data");
    		}else{
    		$scope.locations = results.storeInfo;
        console.log($scope.locations.length);
        for (var i = 0; i < $scope.locations.length; i++) {
          $scope.regions.push($scope.locations[i].Reg)
          $scope.markets.push($scope.locations[i].Market)
        }
        vm.markerFunction();
    		}
    		}catch(e){
    			console.log(e);
    		}
    	}, function(e){
    	console.log(e);
    	});
    }
    $scope.initialize();
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(latLng);
    });
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
    var createMarker = function (info){
      if (info.flag < 1) {
        icon = "img/red-dot.png"
      }else if (info.flag >= 1) {
        icon = "img/green-dot.png"
      }
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.LATITUDE_DGR, info.LONGITUDE_DGR),
            title: info.CLUB_NBR,
            icon: new google.maps.MarkerImage(icon)
        });
        marker.content = '<div class="infoWindowContent">' + "LY SALES: " + info.ly_fresh_sales + '</div>' +
                         '<div class="infoWindowContent">' + "TY SALES " + info.ty_fresh_sales + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    $scope.changedRegion = function(selectedregion){
      for (var i = 0; i < $scope.markers.length; i++ ) {
        $scope.markers[i].setMap(null);
      }
      for (i = 0; i < $scope.locations.length; i++){
        if ($scope.locations[i].Reg == selectedregion) {
            createMarker($scope.locations[i]);
        }
      }
    }
    $scope.changedMarket = function(selectedmarket){
      for (var i = 0; i < $scope.markers.length; i++ ) {
        $scope.markers[i].setMap(null);
      }
      for (i = 0; i < $scope.locations.length; i++){
        if ($scope.locations[i].Market == selectedmarket) {
            createMarker($scope.locations[i]);
        }
      }
    }
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
})
