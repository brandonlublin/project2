var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/roundResults", function (req, res) {
    //console.log("req",req);
    var userAndAnswer = {
      users: []
    };
    db.UserAnswer.findAll({}).then(function (dbUser) {
      // console.log("db", dbUser);
      userAndAnswer = {
        users: dbUser
      };      
    });

    //The array is working
    // console.log("Result", userAndAnswer);
    res.render("RoundResults", userAndAnswer);
  });

  app.get("/gameResults", function (req, res) {
    res.render("GameResults")
  });

  app.get("/answerChoice", function (req, res) {
    res.render("AnswerChoice")
  });

  app.get("/question", function (req, res) {
    console.log("/question")
    db.Trivia.findAll({}).then(function (dbQuestions) {
      console.log("db: ", dbQuestions)
      let questionObj = {
        questions: []
      }
      var randomIndex = Math.floor(Math.random() * Object.keys(questionObj.questions).length)
      let parsedQuestions = JSON.stringify(questionObj.questions)
      dbQuestions.forEach(function (question) {
        questionObj.questions.push(question.dataValues)



        questionObj.questions.splice(randomIndex)
        // console.log(parsedQuestions);
      })
      var obj = {
        questions: dbQuestions
      }
      console.log("------------")
      console.log(obj)
      // console.log("Question obj: " + JSON.stringify(questionObj));
      res.render("game", obj);
    });


  });


  app.get("/play/:gameid", function (req, res) {
    /*
      find game by id
      get triviaIds split and for each find trivia by id create an obj with user id, round, and all the trivia data
    */
    db.Game.findByPk(req.params.gameid)
      .then(function (game) {
        var gameData = {
          trivia: [],
          userIds: game.dataValues.userIds.split(","),
          triviaIds: game.dataValues.triviaIds.split(","),
          round: game.dataValues.round,
          id: game.dataValues.id,
          userCount: game.dataValues.userCount
        }
        //  console.log(gameData.triviaIds)
        //  console.log(gameData.triviaIds.length)
        for (var i = 0; i < 4; i++) {
          var id = parseInt(gameData.triviaIds[i]);

          getTrivia(id)
            .then(function (triviaData) {
              // console.log("triviaData", triviaData)
              gameData.trivia.push(triviaData)
              console.log(gameData.trivia)
              if (gameData.trivia.length === 4) {
                res.render('game', gameData);
              }
            })
        }
      })
  })

  function cycleTriviaIds(gameData, cb) {
    for (var i = 0; i < gameData.triviaIds.length; i++) {
      var id = parseInt(gameData.triviaIds[i]);
      getTrivia(id)
        .then(function (triviaData) {
          gameData.trivia.push(triviaData)
        })
    }
    cb()
  }

  function getTrivia(id) {
    var id = parseInt(id)

    return db.Trivia.findByPk(id)
      .then(function (trivia) {
        return trivia.dataValues
      })
  }


  app.get("/answerChoice", function (req, res) {
    db.UserAnswer.findAll({}).then(function (dbAnswer) {
      res.render("AnswerChoice", {
        userAnswer: dbAnswer.userAnswer
      });
    });
  });

  app.get("/roundResults", function (req, res) {
    db.UserAnswer.findAll({}).then(function (dbAnswer) {
      res.render("RoundResults", {
        userAnswer: dbAnswer.userAnswer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
