module.exports = function(app) {
  app.factory('ChatServ', [
    '$http',
    '$rootScope',
    'ApiEndpoint',
    ChatServ
  ]);
};

function ChatServ($http, $rootScope, ApiEndpoint) {
  var chatServ = {};

  // Data.
  chatServ.chatMessages = [];
  chatServ.inputOptions = {};

  // Methods.
  chatServ.requestNextCard = requestNextCard;
  chatServ.addNextCard = addNextCard;
  chatServ.inputOptionToMessages = inputOptionToMessages;
  chatServ.clearInputOptions = clearInputOptions;

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
      chatServ.chatMessages.push(currentCard);
    }

    // Do another request if the next speaker is also an AI.
    if (nextSpeaker === "ai") {
      this.requestNextCard(currentCard, this.addNextCard);
    }

    // Populate choices if next speaker is a client.
    if (nextSpeaker === "client") {
      console.log("Next speaker is a client.");
      this.clearInputOptions();

      // Push over the options.
      for (var i in responseCard.childrenCards) {
        chatServ.inputOptions[responseCard.childrenCards[i].cardID] = 
          responseCard.childrenCards[i];
        console.log("chatServ.inputOptions: ");
        console.log(chatServ.inputOptions);
      }
    }
  }

  // Add chosen input card to chatMessages.
  function inputOptionToMessages(inputOption) {
    chatServ.chatMessages.push(inputOption);
    this.clearInputOptions();
    this.requestNextCard(inputOption);
  }

  function clearInputOptions() {
    chatServ.inputOptions = {};
    console.log("inputOptions are cleared.");
  }

  // HELPERS ******************************************************************

  return chatServ;
}
