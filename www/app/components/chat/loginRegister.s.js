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
  var loginRegisterServ = 
    angular.extend(LoginRegisterServ.prototype, ChatServ);

  // Methods.
  loginRegisterServ.isLoggedIn = isLoggedIn;
  loginRegisterServ.requestNextCard = requestNextCard;
  // loginRegisterServ.addNextCard --- For the correct follow-up action. 

  // Data.
  loginRegisterServ.msgStorage = LoginStoryboard.conversation;
  loginRegisterServ.dataStore = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  // METHODS ******************************************************************

  function isLoggedIn() {
    var url = ApiEndpoint.url + '/is_logged_in';
    return $http.get({
      url: url,
      timeout: 5,
      // timeout: 1000,
    });
  }

  // Provide the next blurbs in the list depending on the input ID.
  function requestNextCard(card) {
    var currentCard = loginRegisterServ.msgStorage[card.cardID];
    var receivedCard = 
      loginRegisterServ.msgStorage[currentCard.childrenCardIDs[0]];

    receivedCard.childrenCards = [];
    for (var i in receivedCard.childrenCardIDs) {
      // TODO: Refactor to make more readable.
      // Populates the children IDs with actual children.
      receivedCard.childrenCards
        .push(loginRegisterServ.msgStorage[receivedCard.childrenCardIDs[i]]);
    }

    this.addNextCard(receivedCard);
  }

  // HELPERS ******************************************************************

  return loginRegisterServ;
}
