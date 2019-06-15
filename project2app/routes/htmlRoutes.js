var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/username", function(req, res) {
      res.render("username");

    // db.Answer.create({
    //   userAnswer: "Test",
    //   username: "Brandon",
    //   include: ["Questions"]
    // });
  });
  
  app.get("/question", function(req, res) {
    db.Trivia.findAll({}).then(function(dbQuestions) {
      let questionObj = {
        questions: []
      }
      var randomIndex = Math.floor(Math.random() * dbQuestions.length - 1); 
      dbQuestions.forEach(function(question) {
        questionObj.questions.push(question.dataValues)
      })
      // console.log("random question: " + JSON.stringify(questionObj.questions[randomIndex]));
      questionObj.questions.splice(randomIndex)
      // console.log(questionObj.questions);
      // console.log("Question obj: " + JSON.stringify(questionObj));
      res.render("Question", questionObj);
    });
    
    
  });

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
