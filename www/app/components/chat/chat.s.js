module.exports = function(app) {
  app.factory('ChatServ', [
    '$http',
    '$rootScope',
    '$auth',
    'ApiEndpoint',
    ChatServ
  ]);
};

function ChatServ($http, $rootScope, $auth, ApiEndpoint) {
  var chatServ = {};

  // Data.
  chatServ.chatMessages = [];
  chatServ.inputOptions = {};
  chatServ.guestToken = undefined;
  chatServ.isLoggedIn = false;

  // Methods.
  chatServ.getGuestToken = getGuestToken;
  chatServ.requestNextCard = requestNextCard;
  chatServ.delegateNextCard = delegateNextCard;
  chatServ.addChatMessage = addChatMessage;
  chatServ.inputOptionToMessages = inputOptionToMessages;
  chatServ.clearInputOptions = clearInputOptions;
  chatServ.clearAll = clearAll;

  // METHODS ******************************************************************

  function getGuestToken() {
    var route = ApiEndpoint.url + "/guest_token";
    $http.get(route).then(function(response) {
      chatServ.guestToken = response.data.guest_token;

      chatServ.requestNextCard({
        cardID: "root"
      });
    }, function(error) {
      console.log(error);
    });
  }

  function requestNextCard(_card) {
    console.log("CharServ requestNextCard");

    var card = _card;

    // Add the guest token.
    if (chatServ.guestToken) {
      card.guest_token = chatServ.guestToken;
    }

    if (card === undefined) { return; }
    console.log('About to requestNextCard.');

    var url = ApiEndpoint.url + '/converse';
    var _this = this;
    $http.post(url, card)
      .success(function(receivedCard, status, headers, config){
        console.log("requestNextCard success.");
        console.log(receivedCard);

        // When we reach the last message, terminate the conversation.
        if (receivedCard === null) {
          console.log("No more messages to receive.");
          return;
        }
        _this.delegateNextCard(receivedCard);
      })
      .error(function(data, status, headers, config){
        console.log("requestNextCard error.");
        console.log(data);  
      });
  }

  function delegateNextCard(responseCard) {
    console.log("delegateNextCard");
    console.log(responseCard);

    if (responseCard.action) {
      if (responseCard.action === "sign_in") {
        submitLogin(responseCard.parameters);
        return;
      } else if (responseCard.action === "register") {
        submitRegister(responseCard.parameters);
        return;
      }
    }

    // TODO: Temporary fix.
    if (responseCard.childrenCards === undefined) {
      responseCard.childrenCards = [{
        speaker: "fin"
      }];
    }

    var currentCard = responseCard;
    var nextSpeaker = responseCard.childrenCards[0].speaker;

    // Push the mssage of the card.
    if (currentCard.speaker === "ai") {
      chatServ.chatMessages.push(currentCard);
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

      return;
    }

    // Default requesting of next card.
    this.requestNextCard(currentCard);
  }

  function addChatMessage(card) {
    chatServ.chatMessages.push(card);
  }

  // Add chosen input card to chatMessages.
  function inputOptionToMessages(inputOption) {
    this.addChatMessage(inputOption);
    this.clearInputOptions();
    this.requestNextCard(inputOption);
  }

  function clearInputOptions() {
    chatServ.inputOptions = {};  
    console.log("inputOptions are cleared.");
  }

  function clearAll() {
    chatServ.chatMessages = [];
    chatServ.inputOptions = {};
  }

  // HELPERS ******************************************************************

  function submitLogin(loginParams) {
    // Complete POST request and redirect.
    var route = ApiEndpoint.url + "/auth/sign_in/";
    $auth.submitLogin(loginParams)
      .then(function(resp) {
        console.log("Logged in.");
        console.log(resp);
        chatServ.guestToken = undefined;
        $rootScope.$emit('pearl:refresh');
      })
      .catch(function(resp) {
        console.log("Failed logging in.");
        console.log(resp);
      });
  }

  function submitRegister(_registerParams) {
    var registerParams = _registerParams;
    // Complete POST request and redirect.
    var route = ApiEndpoint.url + "/auth/";
    registerParams.confirm_success_url = "https://www.openpearl.org/";

    console.log("Posting info.");

    $http.post(route, registerParams).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("Logging in successful.");
        console.log(data.messages);
      }).
      error(function(data, status, headers, config) {
        console.error("Error sending login-signup.");
        
        console.log("dbg: data, status, headers, config");
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
        console.log("dbg: end");
      });
  }

  return chatServ;
}
