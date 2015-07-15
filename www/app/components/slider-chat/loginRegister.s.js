module.exports = function(app) {
  app.factory('LoginRegisterServ', [
    '$http',
    '$rootScope',
    '$timeout',
    'ApiEndpoint',
    'LoginStoryboard',
    LoginRegisterServ
  ]);
};

function LoginRegisterServ($http, $rootScope, $timeout, ApiEndpoint, LoginStoryboard) {
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

  // DATA *********************************************************************

  loginRegisterServ.msgStorage = LoginStoryboard.conversation;

  // METHODS ******************************************************************

  function isLoggedIn() {
    var url = ApiEndpoint.url + '/is_logged_in';
    return $http.get(url);
  }

  // Provide the next blurbs in the list depending on the input ID.
  function requestNextCard(cardID, callback) {
    var formattedMessage = {
      "speaker": this.msgStorage[cardID].speaker,
      "message": this.msgStorage[cardID].messages 
    };

    this.chatMessages.push(formattedMessage);

    callback();
  }

  // HELPERS ******************************************************************

  return loginRegisterServ;
}
