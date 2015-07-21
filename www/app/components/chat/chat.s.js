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

  // Data.
  _this.chatMessages = [];
  _this.inputOptions = {};

  // Methods.
  _this.requestNextCard = requestNextCard;
  _this.addNextCard = addNextCard;
  _this.inputOptionToMessages = inputOptionToMessages;
  _this.clearInputOptions = clearInputOptions;

  // METHODS ******************************************************************

  function requestNextCard(_card, callback) {
    var card = _card;
    if (card === undefined) { return; }
    console.log('About to requestNextCard.');

    var url = ApiEndpoint.url + '/pearl/converse';
    $http.post(url, card)
      .success(function(receivedCard, status, headers, config){
        console.log("requestNextCard success.");
        console.log(receivedCard);

        // When we reach the last message, terminate the conversation.
        if (receivedCard === null) {
          console.log("No more messages to receive.");
          return;
        }
        callback(receivedCard);
      })
      .error(function(data, status, headers, config){
        console.log("requestNextCard error.");
        console.log(data);  
      });
  }

  function addNextCard(responseCard) {
    console.log("addNextCard");
    console.log(responseCard);

    if (responseCard.childrenCards.length === 0) {
      console.log("No more cards to add.");
      return;
    }
    var currentCard = responseCard;
    var nextSpeaker = responseCard.childrenCards[0].speaker;

    // Push the mssage of the card.
    if (currentCard.speaker === "ai") {
      _this.chatMessages.push(currentCard);
    }

    // Do another request if the next speaker is also an AI.
    if (nextSpeaker === "ai") {
      _this.requestNextCard(currentCard, _this.addNextCard);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");
      _this.clearInputOptions();

      // Push over the options.
      for (var i in responseCard.childrenCards) {
        _this.inputOptions[cardID] = responseCard.childrenCards[i];
        console.log("_this.inputOptions: ");
        console.log(_this.inputOptions);
      }
    }
  }

  // Add chosen input card to chatMessages.
  function inputOptionToMessages(inputOption) {
    _this.chatMessages.push(inputOption);
    _this.clearInputOptions();
    _this.requestNextCard(inputOption);
  }

  function clearInputOptions() {
    _this.inputOptions = {};
    console.log("inputOptions are cleared.");
  }

  // HELPERS ******************************************************************
}
