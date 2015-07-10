module.exports = function(app) {
  app.factory('ChatServ', [
    '$http',
    '$rootScope',
    'ApiEndpoint',
    ChatServ
  ]);
}

function ChatServ($http, $rootScope, ApiEndpoint) {

  var chatServ = {
    chatMessages: [],
    httpRequestNextCard: httpRequestNextCard
  }

  function httpRequestNextCard(nextCardID, callback) {
    var nextCardID = typeof nextCardID !== 'undefined' ? nextCardID : "root";
    console.log('About to httpRequestNextCard.');

    var url = ApiEndpoint.url + '/pearl/converse';
    var cardRequest = {
      cardID: nextCardID
    }

    $http.post(url, cardRequest)
      .success(function(data, status, headers, config){

        console.log("httpRequestNextCard success.");
        console.log(data);

        // When we reach the last message, terminate the conversation.
        if (data === null) {
          console.log("No more messages to receive.");
          return;
        }

        // console.log(callback);
        callback(data);
      })
      .error(function(data, status, headers, config){
        console.log("httpRequestNextCard error.");
        console.log(data);  
      });
  }

  // HELPERS ********************

  return chatServ;
}
