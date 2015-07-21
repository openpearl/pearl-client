module.exports = function(app) {
  app.service('LoginRegisterServ', [
    '$http',
    'ApiEndpoint',
    'LoginStoryboard',
    'ChatServ',
    LoginRegisterServ
  ]);
};

function LoginRegisterServ($http, ApiEndpoint, LoginStoryboard, ChatServ) {

  // Inheritance so that we can overwrite CharServ's server communications.
  angular.extend(LoginRegisterServ.prototype, ChatServ);
  var _this = this;

  // Methods.
  _this.isLoggedIn = isLoggedIn;
  _this.requestNextCard = requestNextCard;
  // _this.addNextCard --- For the correct follow-up action. 

  // Data.
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
  function requestNextCard(card) {
    var currentCard = _this.msgStorage[card.cardID];
    var receivedCard = _this.msgStorage[currentCard.childrenCardIDs[0]];

    receivedCard.childrenCards = [];
    for (var i in receivedCard.childrenCardIDs) {
      // TODO: Refactor to make more readable.
      // Populates the children IDs with actual children.
      receivedCard.childrenCards
        .push(_this.msgStorage[receivedCard.childrenCardIDs[i]]);
    }

    _this.addNextCard(receivedCard);
  }

  // HELPERS ******************************************************************
}
