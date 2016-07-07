myApp.controller('locateItemsController', function($scope,$rootScope, $ionicModal, $timeout) {
  // $rootScope.startSpeechAssistant = function(){
  // var speaker = new webspeech.Speaker();
  // speaker.speak("en", "Hi, I am Walmart speech assistant, How can I help you?");
  // }
  // $rootScope.startSpeechAssistant();
  // $scope.speakingFlag = 0;
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
  console.log($scope.speechData.length)

  $scope.speakingFlag = 0;
  $scope.recognizedText = '';
  $scope.data = {
    speechText: ''
  };
// Function to convert text-to-speech
  $scope.speakText = function(){
    console.log($scope.speechData.length);
    console.log($scope.data.speechText);
    var i = 0;
    do {
      console.log($scope.speechData[i].question);
      console.log(i)
      if ($scope.data.speechText == $scope.speechData[i].question) {
        console.log($scope.speechData[i].answer);
        try {
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
        } catch (e) {
          console.log(e);
        }
      }
      i++;
    } while (i < $scope.speechData.length);
    if ($scope.speakingFlag == 0) {
        console.log("I cannot find " + $scope.data.speechText + " in my database. please try something else");
        try {
          TTS.speak({
                 text: "I cannot find " + $scope.data.speechText + " in my database. please try something else",
                 locale: 'en-GB',
                 rate: 1
             }, function () {
                 // Do Something after success
             }, function (reason) {
                 // Handle the error case
             });
        } catch (e) {
          console.log(e)
        }
    }
  }
// Functin to convert speech-to-text

})
