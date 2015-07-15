module.exports = function(app) {
  app.service('LoginRegisterServ', [
    'ChatServ',
    '$http',
    '$rootScope',
    '$timeout',
    'ApiEndpoint',
    'LoginStoryboard',
    LoginRegisterServ
  ]);
};

function LoginRegisterServ(ChatServ, $http, $rootScope, $timeout, ApiEndpoint, LoginStoryboard) {

  var _this = this;

  _this.isLoggedIn = isLoggedIn;
  _this.requestNextCard = requestNextCard;
  _this.addNextCard = ChatServ.addNextCard;
  _this.msgStorage = LoginStoryboard.conversation;
  
  _this.dataStore = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  // METHODS ******************************************************************

  function isLoggedIn() {
    var url = ApiEndpoint.url + '/is_logged_in';
    return $http.get(url);
  }

  // Provide the next blurbs in the list depending on the input ID.
  function requestNextCard(newCardRequest, callback) {
    var receivedCard = _this.msgStorage[newCardRequest.cardID];
    receivedCard.childrenCards = [];
    for (var i in receivedCard.childrenCardIDs) {
      // TODO: Refactor to make more readable.
      // Populates the children IDs with actual children.
      receivedCard.childrenCards
        .push(_this.msgStorage[receivedCard.childrenCardIDs[i]]);
    }

    // TODO: This binding and pseudo-inheritance is real jank.
    var boundCallback = callback.bind(_this);
    boundCallback(receivedCard);
  }

  // HELPERS ******************************************************************
}
