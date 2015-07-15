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

  console.log(LoginStoryboard);
  loginRegisterServ.msgStorage = LoginStoryboard.conversation;

  // loginRegisterServ.msgStorage = {
  //   "introChats": {
  //     "ai": [
  //       "Hi! I'm Pearl, your personal health assistant.",
  //       "Drag down anytime to refresh our conversation :D",
  //       "Want to login or register?"
  //     ],
  //     "client": [
  //       "Login",
  //       "Register"
  //     ]
  //   }

  //   "loginChats": [
  //     "Email?",
  //     "Password?"
  //   ],
  //   "registerChats": [
  //     "What's your name?",
  //     "Email?",
  //     "Password",
  //     "(Password) one more time!"
  //   ]
  // };

  function isLoggedIn() {
    var url = ApiEndpoint.url + '/is_logged_in';
    return $http.get(url);
  }

  // Provide the next blurbs in the list depending on the input ID.
  function requestNextCard(cardID) {
    var formattedMessage = {
      "speaker": this.msgStorage[cardID].speaker,
      "message": this.msgStorage[cardID].messages 
    };

    this.chatMessages.push(formattedMessage);
  }

  // HELPERS ******************************************************************

  return loginRegisterServ;
}
