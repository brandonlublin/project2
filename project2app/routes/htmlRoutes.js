var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
<<<<<<< HEAD
    db.Question.findAll({}).then(function(dbQuestions) {
      console.log("find all");
      res.render("index", {
        Question: dbQuestions
        // examples: dbQuestions
=======
    db.Question.findOne({}).then(function(dbQuestions) {
      // res.json(dbQuestions);
      res.render("index", {
        text: dbQuestions.text,
        description: dbQuestions.description
>>>>>>> a13d46948c8ea4e05a2feeffd7b9cd08bdc5e784
      });

    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbAnswer) {
    //   res.render("", {
    //     example: dbAnswer
    //   });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
