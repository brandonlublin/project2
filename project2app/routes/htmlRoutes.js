var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/username", function(req, res) {
      res.render("username", {
        username: req.body.username
      });
  });
  
  app.get("/question", function(req, res) {
    db.Trivia.findAll({}).then(function(dbQuestions) {
      let questionObj = {
        questions: []
      }
      var randomIndex = Math.floor(Math.random()*Object.keys(questionObj.questions).length)
      
      dbQuestions.forEach(function(question) {
        questionObj.questions.push(question.dataValues)
        
      })

      questionObj.questions.splice(randomIndex)
      console.log(parsedQuestions);
      
      // console.log("Question obj: " + JSON.stringify(questionObj));
      res.render("Question", {
        questions: JSON.stringify(questionObj.questions)
      });
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
