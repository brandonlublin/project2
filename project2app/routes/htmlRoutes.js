var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/roundResults", function(req, res) {
    res.render("RoundResults");
  });

  app.get("/gameResults", function(req, res) {
    res.render("GameResults");
  });

  app.get("/play/:gameid/:questionid", function(req, res) {
    db.UserAnswer.findAll({
      where: {
        GameId: parseInt(req.params.gameid),
        TriviumId: parseInt(req.params.questionid)
      }
    }).then(function(triviaRes) {
      var answers = [];
      triviaRes.forEach(function(answer) {
        answers.push(answer.dataValues);
        if (answers.length === 4) {
          res.render("AnswerChoice", { userAnswer: answer });
        }
      });
    });
  });

  app.get("/question", function(req, res) {
    db.Trivia.findAll({}).then(function(dbQuestions) {
      var questionObj = {
        questions: []
      };
      var randomIndex = Math.floor(
        Math.random() * Object.keys(questionObj.questions).length
      );
      var parsedQuestions = JSON.stringify(questionObj.questions);
      dbQuestions.forEach(function(question) {
        questionObj.questions.push(question.dataValues);
      });

      questionObj.questions.splice(randomIndex);
      console.log(parsedQuestions);

      // console.log("Question obj: " + JSON.stringify(questionObj));
      res.render("Question", {
        questions: JSON.stringify(questionObj.questions)
      });
    });
  });

  app.get("/play/:gameid", function(req, res) {
    /*
      find game by id
      get triviaIds split and for each find trivia by id create an obj with user id, round, and all the trivia data
    */
    db.Game.findByPk(req.params.gameid).then(function(game) {
      var gameData = {
        round: game.dataValues.round,
        questionObj: null,
        userIds: game.dataValues.userIds.split(","),
        triviaIds: game.dataValues.triviaIds.split(","),
        id: game.dataValues.id,
        userCount: game.dataValues.userCount
      };
      var id = gameData.triviaIds[gameData.round - 1];
      console.log(gameData.round - 1);
      getTrivia(id).then(function(triviaData) {
        gameData.questionObj = triviaData;

        res.render("game", gameData);
      });
    });
  });

  function getTrivia(id) {
    var id = parseInt(id);

    return db.Trivia.findByPk(id).then(function(trivia) {
      return trivia.dataValues;
    });
  }

  app.get("/answerChoice", function(req, res) {
    db.UserAnswer.findAll({}).then(function(dbAnswer) {
      res.render("AnswerChoice", {
        userAnswer: dbAnswer.userAnswer
      });
    });
  });

  app.get("/roundResults", function(req, res) {
    db.UserAnswer.findAll({}).then(function(dbAnswer) {
      res.render("RoundResults", {
        userAnswer: dbAnswer.userAnswer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
