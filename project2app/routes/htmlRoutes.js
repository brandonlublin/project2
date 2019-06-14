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
    db.Question.findAll({}).then(function(dbQuestions) {
      let questionObj = {
        questions: []
      }
      dbQuestions.forEach(function(question) {
        questionObj.questions.push(question.dataValues)
        console.log(question.dataValues);
        
      })
      res.render("Question", questionObj);
    });
  });

  app.get("/answers", function(req, res) {
    db.Answer.findAll({}).then(function(dbAnswer) {
      res.render("Answers", {
        userAnswer: dbAnswer.userAnswer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
