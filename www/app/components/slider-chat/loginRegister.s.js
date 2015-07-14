module.exports = function(app) {
  app.factory('LoginRegisterServ', [
    '$http',
    '$rootScope',
    '$timeout',
    'ApiEndpoint',
    LoginRegisterServ
  ]);
};

function LoginRegisterServ($http, $rootScope, $timeout, ApiEndpoint) {
  var loginRegisterServ = {
    chatMessages: [],
    msgStorage: {},

    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    isLoggedIn: isLoggedIn,
    requestNextCard: requestNextCard
  };

  // DATA ********************

  loginRegisterServ.msgStorage = {
    "introChats": [
      "Hi! I'm Pearl, your personal health assistant.",
      "Drag down anytime to refresh our conversation :D",
      "Want to login or register?"
    ],
    "loginChats": [
      "Email?",
      "Password?"
    ],
    "registerChats": [
      "What's your name?",
      "Email?",
      "Password",
      "(Password) one more time!"
    ]
  };

  function isLoggedIn() {
    var url = ApiEndpoint.url + '/is_logged_in';
    return $http.get(url);
  }

  // Provide the next blurbs in the list depending on the input ID.
  function requestNextCard(chatBlobID) {
    var messages = this.msgStorage[chatBlobID];
    for (var i in messages) {
      var formattedMessage = {
        "speaker": "ai",
        "message": messages[i] 
      };
      this.chatMessages.push(formattedMessage);
    }
  }

  // HELPERS ********************

  return loginRegisterServ;
}
