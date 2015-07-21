module.exports = function(app) {
  app.constant('LoginStoryboard', {
    conversation: storedConversation
  });
};

var storedConversation = {
  "root": {
    "cardID": "root",
    "childrenCardIDs": [
      "qwerty"
    ],
    "speaker": "ai",
    "message": "",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "0",
    "parentCardIDs": [],
    "filters": []
  },
  "qwerty": {
    "cardID": "qwerty",
    "childrenCardIDs": [
      "uuid_31f6e7046976d442"
    ],
    "speaker": "ai",
    "message": "Hi! I'm Pearl, your personal health assistant.",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "0",
    "parentCardIDs": [],
    "filters": []
  },
  "uuid_31f6e7046976d442": {
    "cardID": "uuid_31f6e7046976d442",
    "childrenCardIDs": [
      "uuid_a138b51a1986cd67"
    ],
    "parentCardIDs": [
      "qwerty"
    ],
    "speaker": "ai",
    "message": "Drag down anytime to refresh our conversation :D",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "398.888888888889",
    "filters": []
  },
  "uuid_a138b51a1986cd67": {
    "cardID": "uuid_a138b51a1986cd67",
    "childrenCardIDs": [
      "uuid_36653bb0d497b34d",
      "uuid_a7ed06b861431ea3"
    ],
    "parentCardIDs": [
      "uuid_31f6e7046976d442"
    ],
    "speaker": "ai",
    "message": "Want to login or register?",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "798.888888888889",
    "filters": []
  },
  "uuid_36653bb0d497b34d": {
    "cardID": "uuid_36653bb0d497b34d",
    "childrenCardIDs": [
      "uuid_6a538423764a3426"
    ],
    "parentCardIDs": [
      "uuid_a138b51a1986cd67"
    ],
    "speaker": "client",
    "message": "login",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "1198.88888888889",
    "filters": []
  },
  "uuid_a7ed06b861431ea3": {
    "cardID": "uuid_a7ed06b861431ea3",
    "childrenCardIDs": [
      "uuid_7755aa439b9e40bb"
    ],
    "parentCardIDs": [
      "uuid_a138b51a1986cd67"
    ],
    "speaker": "client",
    "message": "register",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "792.333333333333",
    "filters": []
  },
  "uuid_6a538423764a3426": {
    "cardID": "uuid_6a538423764a3426",
    "childrenCardIDs": [
      "uuid_532fd06be6dc93de"
    ],
    "parentCardIDs": [
      "uuid_36653bb0d497b34d"
    ],
    "speaker": "ai",
    "message": "Email?",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "1537.88888888889",
    "filters": []
  },
  "uuid_532fd06be6dc93de": {
    "cardID": "uuid_532fd06be6dc93de",
    "childrenCardIDs": [
      "uuid_039846a019bdd0a4"
    ],
    "parentCardIDs": [
      "uuid_6a538423764a3426"
    ],
    "speaker": "client",
    "inputs": ["email"],
    "cardType": "email",
    "visible": "true",
    "highlight": "false",
    "xpos": "0",
    "ypos": "1830.22222222222",
    "filters": []
  },
  "uuid_039846a019bdd0a4": {
    "cardID": "uuid_039846a019bdd0a4",
    "childrenCardIDs": [
      "uuid_cb8cd62d8d553372"
    ],
    "parentCardIDs": [
      "uuid_532fd06be6dc93de"
    ],
    "speaker": "ai",
    "message": "Password?",
    "visible": "true",
    "highlight": "false",
    "xpos": "-1.11111111111111",
    "ypos": "2168.88888888889",
    "filters": []
  },
  "uuid_cb8cd62d8d553372": {
    "cardID": "uuid_cb8cd62d8d553372",
    "childrenCardIDs": [
      "uuid_c3aec3a564bba02d"
    ],
    "parentCardIDs": [
      "uuid_039846a019bdd0a4"
    ],
    "speaker": "client",
    "inputs": ["password"],
    "cardType": "password",
    "visible": "true",
    "highlight": "false",
    "xpos": "-1",
    "ypos": "2514.55555555556",
    "filters": []
  },
  "uuid_7755aa439b9e40bb": {
    "cardID": "uuid_7755aa439b9e40bb",
    "childrenCardIDs": [
      "uuid_6372127a67c84d05"
    ],
    "parentCardIDs": [
      "uuid_a7ed06b861431ea3"
    ],
    "speaker": "ai",
    "message": "Name?",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "1192.33333333333",
    "filters": []
  },
  "uuid_6372127a67c84d05": {
    "cardID": "uuid_6372127a67c84d05",
    "childrenCardIDs": [
      "uuid_08f5e8ef7328ab45"
    ],
    "parentCardIDs": [
      "uuid_7755aa439b9e40bb"
    ],
    "speaker": "client",
    "inputs": ["name"],
    "cardType": "text",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "1592.33333333333",
    "filters": []
  },
  "uuid_08f5e8ef7328ab45": {
    "cardID": "uuid_08f5e8ef7328ab45",
    "childrenCardIDs": [
      "uuid_aeca97318d24a710"
    ],
    "parentCardIDs": [
      "uuid_6372127a67c84d05"
    ],
    "speaker": "ai",
    "message": "Email?",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "1992.33333333333",
    "filters": []
  },
  "uuid_aeca97318d24a710": {
    "cardID": "uuid_aeca97318d24a710",
    "childrenCardIDs": [
      "uuid_162de4b756bba546"
    ],
    "parentCardIDs": [
      "uuid_08f5e8ef7328ab45"
    ],
    "speaker": "client",
    "inputs": ["email"],
    "cardType": "email",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "2392.33333333333",
    "filters": []
  },
  "uuid_162de4b756bba546": {
    "cardID": "uuid_162de4b756bba546",
    "childrenCardIDs": [
      "uuid_fc67a9223e0c1fb0"
    ],
    "parentCardIDs": [
      "uuid_aeca97318d24a710"
    ],
    "speaker": "ai",
    "message": "Password?",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "2792.33333333333",
    "filters": []
  },
  "uuid_fc67a9223e0c1fb0": {
    "cardID": "uuid_fc67a9223e0c1fb0",
    "childrenCardIDs": [
      "uuid_776e790998b956ca"
    ],
    "parentCardIDs": [
      "uuid_162de4b756bba546"
    ],
    "speaker": "client",
    "inputs": ["password"],
    "cardType": "password",
    "visible": "true",
    "highlight": "false",
    "xpos": "541.111111111111",
    "ypos": "3192.33333333333",
    "filters": []
  },
  "uuid_776e790998b956ca": {
    "cardID": "uuid_776e790998b956ca",
    "childrenCardIDs": [
      "uuid_23bbc2786964d678"
    ],
    "parentCardIDs": [
      "uuid_fc67a9223e0c1fb0"
    ],
    "speaker": "ai",
    "message": "Password again?",
    "visible": "true",
    "highlight": "false",
    "xpos": "541",
    "ypos": "3590.88888888889",
    "filters": []
  },
  "uuid_23bbc2786964d678": {
    "cardID": "uuid_23bbc2786964d678",
    "childrenCardIDs": [
      "uuid_c3aec3a564bba02d"
    ],
    "parentCardIDs": [
      "uuid_776e790998b956ca"
    ],
    "speaker": "client",
    "inputs": ["confirmPassword"],
    "cardType": "password",
    "visible": "true",
    "highlight": "false",
    "xpos": "541",
    "ypos": "3990.88888888889",
    "filters": []
  },
  "uuid_c3aec3a564bba02d": {
    "cardID": "uuid_c3aec3a564bba02d",
    "parentCardIDs": [
      "uuid_23bbc2786964d678",
      "uuid_cb8cd62d8d553372"
    ],
    "speaker": "ai",
    "message": "Thanks!",
    "visible": "true",
    "highlight": "false",
    "xpos": "541",
    "ypos": "4390.8888888888905",
    "filters": [],
    "childrenCardIDs": []
  }
};
