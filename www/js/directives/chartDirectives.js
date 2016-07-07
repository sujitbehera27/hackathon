myApp.directive('c3Chart', function(){
    return {
        restrict: 'E',
        scope:{data:'='},
        link: function(scope, elem, attr){
        //console.log(scope);
             scope.c3Chart = false;

             function drawChart(data){
             //alert(JSON.stringify(data));
             var b= scope.data;
                 return c3.generate({
                     bindto: elem[0],
                     size: {
                         width:attr.width,
                         height:attr.height
                     },
                     data: b,
                     axis: {
                    // rotated: true,
                         x: {
                            //  height: 20,
                            show: true,
                            type: 'category' ,// this needed to load string x value
                            label: {
                                   text: 'Your X Axis',
                                   position: 'outer-center',
                                },
                            tick: {
                                rotate: 0,
                                fit: true,
                                centered: true,

                                }
                        },
                        y: {
                            show: true,
                            inner: false,
                        //  max: 1000,
                        //  min: 0,
                        inverted: false,
                        center: 0,
                         tick: {
                              format: d3.format('$,')
                              //or format: function (d) { return '$' + d; }
                            }
                          }
                     },
                     tooltip: {
                          position: function (data, width, height, element) {
                         // alert(JSON.stringify(element));
                            return {top: 0, left: 0}
                          }
                        }

                 });
             }

            scope.$watch('data',function(data){
                if(scope.c3Chart)
                    scope.c3Chart.load(data);
                else
                    scope.c3Chart = drawChart(data);
            }, true);
        }
    };
})

.directive('lineChart', function(){
    return {
        restrict: 'E',
        scope:{data:'='},
        link: function(scope, elem, attr){
        //console.log(scope);
             scope.lineChart = false;
             $(document).ready(function () {
    $("#s1,#s2,#s3").change(function () {
        var c1 = $("#s1").find('option:selected').val();
        //var c2 = $("#s2").find('option:selected').val();
        //var c3 = $("#s3").find('option:selected').val();
        scope.lineChart
        .hide(null, {
            withLegend: true
        });
        scope.lineChart
        .show([c1], {
            withLegend: true
        });
    });
});

             function drawChart(data){
             //alert(JSON.stringify(data));
             var b= scope.data;
                 return c3.generate({
                     bindto: elem[0],
                     size: {
                         width:attr.width,
                         height:attr.height
                     },
                     data: b,
                     axis: {
                    // rotated: true,
                         x: {
                            //  height: 20,
                            show: true,
                            type: 'category' ,// this needed to load string x value
                            label: {
                                   text: 'Your X Axis',
                                   position: 'outer-center',
                                },
                            tick: {
                                rotate: 0,
                                fit: true,
                                centered: true,

                                }
                        },
                        y: {
                            show: true,
                            inner: false,
                        //  max: 1000,
                        //  min: 0,
                        inverted: false,
                        //center: 0,
                         tick: {
                              format: d3.format('$,')
                              //or format: function (d) { return '$' + d; }
                            }

                          }
                     },
                     tooltip: {
                          position: function (data, width, height, element) {
                         // alert(JSON.stringify(element));
                            return {top: 0, left: 0}
                          }
                        }

                 });
             }


            scope.$watch('data',function(data){
                if(scope.lineChart
                    )
                    scope.lineChart
                .load(data);
                else
                    scope.lineChart
                     = drawChart(data);
            }, true);
        }
    };
});
