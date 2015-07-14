module.exports = function(app) {
  app.factory('ChatServ', [
    '$http',
    '$rootScope',
    'ApiEndpoint',
    ChatServ
  ]);
};

function ChatServ($http, $rootScope, ApiEndpoint) {

  var chatServ = {
    chatMessages: [],
    requestNextCard: requestNextCard
  };

  function requestNextCard(nextCardID, callback) {
    var newCardID = typeof nextCardID !== 'undefined' ? nextCardID : "root";
    console.log('About to requestNextCard.');

    var url = ApiEndpoint.url + '/pearl/converse';
    var cardRequest = {
      cardID: newCardID
    };

    $http.post(url, cardRequest)
      .success(function(data, status, headers, config){

        console.log("requestNextCard success.");
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
        console.log("requestNextCard error.");
        console.log(data);  
      });
  }

  // HELPERS ********************

  return chatServ;
}
