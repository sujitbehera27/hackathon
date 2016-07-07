myApp.controller('chartsController', function($scope,$http) {
$scope.width = $(window).width();
$scope.stores= [];
$scope.required_data = [];
$scope.jsonData = [{
    "ty_fresh_sales": 4849,
    "ly_fresh_sales": 1192,
    "ty_adultbev_sales": 2368,
    "ly_adultbev_sales": 1890,
    "ty_grocery_sales": 1200,
    "ly_grocery_sales": 1854,
    "ty_gm_sales": 4177,
    "ly_gm_sales": 3581,
    "store_nbr" : 89
  },
  {
    "ty_fresh_sales": 1950,
    "ly_fresh_sales": 2082,
    "ty_adultbev_sales": 1301,
    "ly_adultbev_sales": 2509,
    "ty_grocery_sales": 1212,
    "ly_grocery_sales": 1965,
    "ty_gm_sales": 4126,
    "ly_gm_sales": 6333,
    "store_nbr" : 675
  },
  {
    "ty_fresh_sales": 3233,
    "ly_fresh_sales": 2468,
    "ty_adultbev_sales": 3110,
    "ly_adultbev_sales": 1780,
    "ty_grocery_sales": 1511,
    "ly_grocery_sales": 1824,
    "ty_gm_sales": 5432,
    "ly_gm_sales": 5842,
    "store_nbr" : 123
  }];

  $scope.getStore = function(param){
    $scope.selectedStore = param;

  }


$scope.getStoreDD = function()
{
for(var i in $scope.jsonData){
    var key = i;
    var data_element = $scope.jsonData[i];
    var str = data_element["store_nbr"];

    $scope.stores.push(str);

 }
}

$scope.getSalesData = function()

      {
       fetchDataService.getSalesData().then(
        function (results) {

          $scope.salesData = results;

        },
        function (e) {


      } );
}

 $scope.getDataForChart = function() {

 $scope.chartData = "";
 $scope.chartData = $scope.getData($scope.selectedStore);


  console.log("chart" + JSON.stringify($scope.chartData));
              $scope.myData = {
                        json: $scope.chartData,
             types: {
                  ly_sales: 'bar',
                  ty_sales: 'bar',

                },
                        keys: {
                          x: 'dept',
                          value: ['ly_sales', 'ty_sales','data3']
                        },
             groups: [
                [$scope.group1,$scope.group2,$scope.group3]
                ]
          };

    };

$scope.getData = function(storeNumber)
{

for(var i in $scope.jsonData){
    var key = i;
    var data_element = $scope.jsonData[i];
    if(data_element["store_nbr"] == storeNumber)
    {
    $scope.required_data = [{"storeNbr": data_element["store_nbr"],"ty_sales":data_element["ty_fresh_sales"],
    "ly_sales":data_element["ly_fresh_sales"],"dept":"Fresh"},
    {"storeNbr": data_element["store_nbr"],"ty_sales":data_element["ty_adultbev_sales"],
    "ly_sales":data_element["ly_adultbev_sales"],"dept":"Adult"},
    {"storeNbr": data_element["store_nbr"],"ty_sales":data_element["ty_grocery_sales"],
    "ly_sales":data_element["ly_grocery_sales"],"dept":"Grocery"},
    {"storeNbr": data_element["store_nbr"],"ty_sales":data_element["ty_gm_sales"],
    "ly_sales":data_element["ly_gm_sales"],"dept":"General Merchandise"}];


}

 }
 return $scope.required_data;
}

$scope.getDataFromServer = function(value) {
      console.log(value);
            $http({
                    method : 'GET',
                    url : 'js/data/jsondata.json'
            }).success(function(data, status, headers, config) {
        //console.log(config);
        if(value == 2015){
          var subset = [];
          for(var i = 0; i < data.length; i++){
            if(data[i].year == 2015){
              subset.push(data[i]);
            }
          }
        }
        else{
          var subset = [];
          for(var i = 0; i < data.length; i++){
            if(data[i].year == 2016)
              subset.push(data[i]);
          }
        }
        var a = subset;
              $scope.myData = {
                        json: a,
             types: {
                  sales_actl: 'line',
                  sales_plan: 'line'

                },
                        keys: {
                          x: 'wmt_wk',
                          value: ['sales_actl', 'sales_plan']
                        }

          };


            }).error(function(data, status, headers, config) {
                    // called asynchronoussales_actl if an error occurs
                    // or server returns response with an error status.
            });

    }



})
