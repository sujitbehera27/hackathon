myApp.controller('locateItemsController', function($scope,$rootScope, $ionicModal, $timeout) {
  $scope.speechData = [
  {
    "question": "tell me about yourself",
    "answer": "Hi, I am walmart speech assistant, designed by FPP team"
  },
  {
    "question": "how can you help us",
    "answer": "you can ask me about the location of various item in this store. I would be happy to help you in finding them"
  },
  {
    "question": "where can I find cupcakes",
    "answer": "In bakery section. 5 meters north and 3 meters east. In the next version of myself, I would guide you with directions on map"
  },
  {
    "question": "good job",
    "answer": "Thank you for your appreciation"
  },
  {
    "question": "hi",
    "answer": "Hello, I am Sams Club speech assistant. How can I help you"
  }
  ]
  $scope.speakingFlag = 0;
  $scope.recognizedText = '';
  $scope.data = {
    speechText: ''
  };
  $scope.speakText = function() {
    try {
      for(i=0;i<$scope.speechData.length;i++){
        if($scope.speechData[i].question == $scope.data.speechText){
          TTS.speak({
                 text: $scope.speechData[i].answer,
                 locale: 'en-GB',
                 rate: 1
             }, function () {
                 // Do Something after success
                 $scope.speakingFlag = 1;
             }, function (reason) {
                 // Handle the error case
             });
        }
      }
    } catch (e) {}
  };
  $scope.record = function() {
    try {
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.$apply()
        }
        for(i=0;i<$scope.speechData.length;i++){
          if($scope.speechData[i].question == $scope.recognizedText){
            TTS.speak({
                   text: $scope.speechData[i].answer,
                   locale: 'en-GB',
                   rate: 1
               }, function () {
                   $scope.speakingFlag = 1;
               }, function (reason) {
               });
          }
        }
    };
    recognition.start();
    } catch (e) {}
  };
})
