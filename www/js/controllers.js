myApp.controller('locateItemsController', function($scope, $ionicModal, $timeout) {
  $rootScope.startSpeechAssistant = function(){
  var speaker = new webspeech.Speaker();
  speaker.speak("en", "Hi, I am Walmart speech assistant, How can I help you?");
  }
  $rootScope.startSpeechAssistant();
  $scope.speakingFlag = 0;
  $scope.speechData = [
  {
    "question": "where does fpp team sit",
    "answer": "they sit in 11th floor, north B"
  },
  {
    "question": "where is Srini right now",
    "answer": "He is everywhere in 11th floor"
  },
  {
    "question": "where is Vineet",
    "answer": "Not in office"
  },
  {
    "question": "who is Aditya",
    "answer": "Ohh Man!!! He is one after Einstien. The Great!!! Hahahaha"
  },
  {
    "question": "say something",
    "answer": "I have to exercise early in the morning before my brain figures out what I’m doing."
  }
  ]
  var commands = {
  'hey *val' : function(val){
    $scope.speakingFlag = 1;
    var flag = 0;
    $scope.spokenValue = val;
    for(i=0;i<$scope.speechData.length;i++){
      if($scope.speechData[i].question == $scope.spokenValue){
        var speaker = new webspeech.Speaker();
        speaker.speak("en", $scope.speechData[i].answer);
        flag = 1;
      }
    }
    if(flag == 0){
      var speaker = new webspeech.Speaker();
      speaker.speak("en", "Sorry! I couldn't find any answer for your question in my database");
    }
    $scope.$apply();
  }
  }
  annyang.addCommands(commands);
  $scope.activateSpeech = function(){
  annyang.start();
  }
})
