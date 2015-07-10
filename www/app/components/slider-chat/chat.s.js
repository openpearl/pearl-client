module.exports = function(app) {
  app.factory('ChatServ', [
    '$http',
    'ApiEndpoint',
    ChatServ
  ]);
}

function ChatServ($http, ApiEndpoint) {
  var chatServ = {
    httpRequestNextCard: httpRequestNextCard
  }

  function httpRequestNextCard(nextCardID) {
    console.log('About to httpRequestNextCard.');

    var url = ApiEndpoint.url + '/communications';
    var cardRequest = {
      cardID: nextCardID
    }

    $http.post(url, cardID)
      .success(function(data, status, headers, config){

        console.log("httpRequestNextCard success.");
        console.log(data);

        // When we reach the last message, terminate the conversation.
        if (data === null) {
          console.log("No more messages to receive.");
          return;
        }

      })
      .error(function(data, status, headers, config){
        console.log("httpRequestNextCard error.");
        console.log(data);  
      });
  }

  // HELPERS ********************

  return chatServ;
}
