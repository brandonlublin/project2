var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/question", function(req, res) {
    db.Question.findOne({}).then(function(dbQuestions) {
      // res.json(dbQuestions);
      res.render("Question", {
        text: dbQuestions.text
      });
    });

    db.Answer.create({
      text: "Test",
      description: "Brandon",
      include: ["Questions"]
    });
  });

  // Load example page and pass in an example by id
  app.get("/answers", function(req, res) {
    db.Answer.findOne({}).then(function(dbAnswer) {
      res.render("Answers", {
        example: dbAnswer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
