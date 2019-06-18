// Get references to page elements

// The API object contains methods for each kind of request we'll make
var API = {
  // Getting Trivia
  getTrivia: function (id) {
    return $.ajax({
      url: "api/Trivia/" + id,
      type: "GET"
    });
  }

  // Update user answer table
  // updateUserAns: function (UserAns) {
  //   return $.ajax({
  //     url: "api/answers",
  //     type: "POST",
  //     data: JSON.stringify(UserAns)
  //   }, {
  //     // Specific the user who enter the answer
  //     where: {
  //       userId: $this.userId
  //     }
  //   });
  // },

  // Get Updated user answer
  // userAns: function () {
  //   return $.ajax({
  //     url: "api/answers",
  //     type: "GET"
  //   })
  // }
};

var populatQues = function (id) {
  API.getTrivia(id).then(function (data) {
    // console.log(data.triviaText);
    console.log(data.triviaText);
    var question = {
      trivia: data.triviaText
    };
    console.log(question);
   // res.render("game", question);
  });
};
populatQues(1);

// Refresh User Answer table each time a table is added
var updateAns = function() {
  // Calling questionText then input into updateUserAns
  API.updateUserAns(questionText).then(function (data) {
    userAns();
    console.log(data);
  });
};

updateAns();

// Comparing answer between trivia answer and user answer
