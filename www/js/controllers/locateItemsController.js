myApp.controller('locateItemsController', function($scope,$rootScope, $ionicModal, $timeout,speechService) {
$scope.containerFlag = "intro";
// Fetch data from database
  speechService.getSpeechData().then(function (results) {
    console.log(results);
    try{
    if(results.speechInfo.length==0){
      console.log("error in getting data");
    }
    if(results==""){
      console.log("no data");
    }else{
    $scope.speechData = results.speechInfo
    console.log($scope.speechData.length);
    }
    }catch(e){
      console.log(e);
    }
  }, function(e){
  console.log(e);
  });
  speechService.getCardData().then(function (results) {
    console.log(results);
    try{
    if(results.cardData.length==0){
      console.log("error in getting data");
    }
    if(results==""){
      console.log("no data");
    }else{
      console.log(results);
    $scope.things=[];
    $scope.thingsData=[];
    $scope.cardData = results.cardData;
    for(var i=0;i<  $scope.cardData.length;i++){
        $scope.things[i]=$scope.cardData[i].key.toUpperCase();
        $scope.thingsData[i]=$scope.cardData[i].values;
    }
    $scope.salesData = $scope.cardData[0].Sales;
    $scope.AESData = $scope.cardData[0].AES;
    $scope.WagesData = $scope.cardData[0].Wages;
    $scope.inventoryData = $scope.cardData[0].inventory;
    }
    }catch(e){
      console.log(e);
    }
  }, function(e){
  console.log(e);
  });
  console.log($scope.speechData)
  $scope.speakingFlag = 0;
  $scope.recognizedText = '';
  $scope.data = {
    speechText: ''
  };
// onload speaking assistant

$scope.speakOnLoad = function(){
try {
$scope.textToSpeakOnLoad = "Good Morning TIM, How Can I help you today?";
  try {
    TTS.speak({
           text: $scope.textToSpeakOnLoad,
           locale: 'en-GB',
           rate: 1
       }, function () {
           // Do Something after success
           $scope.speakingFlag = 1;
       }, function (reason) {
           // Handle the error case
       });
  } catch (e) {
    $rootScope.startSpeechAssistant = function(){
    var speaker = new webspeech.Speaker();
    speaker.speak("en", $scope.textToSpeakOnLoad);
    }
    $rootScope.startSpeechAssistant();
  }
}catch (e) {
  console.log(e)
}
}
$scope.speakOnLoad();

$scope.record = function() {
  $scope.Words=['BAKERY','FURNITURE','APPAREL','ELECTONICS','GROCERY','INSTOCK','DEMAND','SALES']
  try {
  var recognition = new SpeechRecognition();
  recognition.onresult = function(event) {
      if (event.results.length > 0) {
          $scope.recognizedText = event.results[0][0].transcript;
          $scope.$apply()
      }
      // for(i=0;i<$scope.speechData.length;i++){
        if($scope.recognizedText != ""){
          TTS.speak({
                 text: "Okay!! here we go",
                 locale: 'en-in',
                 rate: 1
             }, function () {
               var x=$scope.recognizedText.split(" ");
               for(var i=0;i<x.length;i++){
                 var index2=$scope.Words.indexOf(x[i].toUpperCase());
                 if(index2!=-1)
                 $scope.recognizedText=x[i];
               }
               var wordIndex=$scope.Words.indexOf($scope.recognizedText.toUpperCase());
               if ($scope.recognizedText != "") {
                 if ($scope.recognizedText == "sales" || $scope.recognizedText=="inventory" || $scope.recognizedText=="associates" || $scope.recognizedText=="wages") {
                       $scope.containerFlag = "sales";
                       var index=$scope.things.indexOf($scope.recognizedText.toUpperCase())
                       if(index!=-1){
                         $scope.contents=[];
                         $scope.contentsData=[];
                         $scope.cardsDataContents=$scope.thingsData[index];
                         for(var i=0;i<$scope.cardsDataContents.length;i++){
                             $scope.contents[i]=$scope.cardsDataContents[i].key.toUpperCase();
                             $scope.contentsData[i]=$scope.cardsDataContents[i].values;
                         }
                       }
                       TTS.speak({
                              text: "Okay!! here we go",
                              locale: 'en-in',
                              rate: 1
                          }, function () {},
                          function (reason){
                          })
                 }else if (wordIndex!=-1) {
                       $scope.containerFlag = "sales content";
                       $scope.properties=[];
                       var index=$scope.contents.indexOf($scope.recognizedText.toUpperCase())
                       if(index!=-1){
                         $scope.properties=$scope.contentsData[index];
                       }
                       TTS.speak({
                              text: "Okay!! here we go",
                              locale: 'en-in',
                              rate: 1
                          }, function () {},
                          function (reason){
                          })
                 }else {
                   TTS.speak({
                          text: "Sorry!! Can you please try again?",
                          locale: 'en-in',
                          rate: 1
                      }, function () {},
                      function (reason){
                      })
                   $scope.containerFlag = "intro";
                 }
               }
             }, function (reason) {
             });
        }
      // }
  };
  recognition.start();
  } catch (e) {
    var commands = {
      '*val' : function(val){
        $scope.speakingFlag = 1;
        var flag = 0;
        $scope.spokenValue = val;
        console.log(val);

        var x=val.split(" ");
        for(var i=0;i<x.length;i++){
          var index2=$scope.Words.indexOf(x[i].toUpperCase());

          if(index2!=-1)
          val=x[i];
        }
        console.log(val);
        var wordIndex=$scope.Words.indexOf(val.toUpperCase());
        if (val != "") {
          if (val == "sales" || val=="inventory" || val=="associates" || val=="wages") {
                console.log("sales");
                $scope.containerFlag = "sales";
                var index=$scope.things.indexOf(val.toUpperCase())
                if(index!=-1){
                  $scope.contents=[];
                  $scope.contentsData=[];
                  $scope.cardsDataContents=$scope.thingsData[index];
                  for(var i=0;i<$scope.cardsDataContents.length;i++){
                      $scope.contents[i]=$scope.cardsDataContents[i].key.toUpperCase();
                      $scope.contentsData[i]=$scope.cardsDataContents[i].values;
                  }
                }
                var speaker = new webspeech.Speaker();
                speaker.speak("en", "OKAY!! Here we go");
                $scope.$apply();
          }else if (wordIndex!=-1) {
                console.log(val);
                $scope.containerFlag = "sales content";
                $scope.properties=[];
                var index=$scope.contents.indexOf(val.toUpperCase())
                if(index!=-1){
                  $scope.properties=$scope.contentsData[index];
                  console.log(  $scope.properties);
                }
                var speaker = new webspeech.Speaker();
                speaker.speak("en", "OKAY!! Here we go");
                $scope.$apply();
          }else {
            var speaker = new webspeech.Speaker();
            speaker.speak("en", "Sorry!! Can you please try again?");
            $scope.$apply();
            $scope.containerFlag = "intro";
          }
        }
      }
    }
    annyang.addCommands(commands);
    $scope.activateSpeech = function(){
    annyang.start();
    }
    $scope.activateSpeech();
  }
};
})
