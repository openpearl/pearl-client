module.exports = function(app) {
  app.service('ChatServ', [
    '$http',
    '$rootScope',
    'ApiEndpoint',
    ChatServ
  ]);
};

function ChatServ($http, $rootScope, ApiEndpoint) {
  var _this = this;

  // _this.chatMessages = [{
  //   speaker: "ai",
  //   message: "Hello world!"
  // }];
  _this.chatMessages = [];
  _this.inputOptions = {};
  _this.requestNextCard = requestNextCard;
  _this.addNextCard = addNextCard;

  function requestNextCard(nextCardRequest, callback) {

    // `nextCardRequest` takes the format of:
    // {
    //   cardID: String,
    //   type: String, // The variable that should be filled in.
    //   style: String, // Could be `email`, `password`, etc for formatting.
    //   value: String // Actual user value.
    // }

    var newCardRequest = nextCardRequest;
    if (nextCardRequest === undefined) { newCardRequest = { cardID: "root" }; }
    console.log('About to requestNextCard.');

    var url = ApiEndpoint.url + '/pearl/converse';

    $http.post(url, newCardRequest)
      .success(function(receivedCard, status, headers, config){
        console.log("requestNextCard success.");
        console.log(receivedCard);

        // When we reach the last message, terminate the conversation.
        if (receivedCard === null) {
          console.log("No more messages to receive.");
          return;
        }
        // console.log(callback);
        callback(receivedCard);
      })
      .error(function(data, status, headers, config){
        console.log("requestNextCard error.");
        console.log(data);  
      });
  }

  function addNextCard(responseCard) {

    if (responseCard.childrenCards.length === 0) {
      console.log("No more cards to add.");
      return;
    }

    console.log("addNextCard");
    console.log(responseCard);

    var currentCardID = responseCard.cardID;
    var currentSpeaker = responseCard.speaker;
    var currentMessage = responseCard.messages;
    var nextSpeaker = responseCard.childrenCards[0].speaker;

    // Push the mssage of the card.
    if (currentSpeaker === "ai") {
      _this.chatMessages.push({
        speaker: currentSpeaker,
        message: currentMessage,
      });

      console.log("chatMessages: ");
      console.log(_this.chatMessages);
    }

    // Do another request if the next speaker is also an AI.
    if (nextSpeaker === "ai") {
      // FIXME: This line is problematic for switching.
      // `this` rather than `_this` is crucial here. 
      // It points to the latest referrer.
      this.requestNextCard({cardID: currentCardID}, this.addNextCard);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");
      _this.inputOptions = {};

      // Push over the options.
      for (var i in responseCard.childrenCards) {
        
        // Perform regex here.
        var _messages = responseCard.childrenCards[i].messages;

        var re = /\%\{(.*?)\}/;
        var inputVariable = re.exec(_messages);
        re.lastIndex = 0;

        var inputMessage = responseCard.childrenCards[i].messages;
        if (inputVariable !== null) {
          inputMessage = "";
        } 

        var cardID = responseCard.childrenCardIDs[i];
        _this.inputOptions[cardID] = {
          inputType: responseCard.childrenCards[i].inputType,
          inputVariable: inputVariable,
          inputMessage: inputMessage,
          cardID: cardID
        };

        console.log("_this.inputOptions: ");
        console.log(_this.inputOptions);
      }
    }
  }

  // HELPERS ******************************************************************
}
