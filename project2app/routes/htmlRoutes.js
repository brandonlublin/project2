var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //GO Straight to homepage, data does not need to be load at this point
    res.render("index");
 
  });

  // Load question data once the start button is click
  app.get("/start", function(req, res) {
    
    db.Question.findAll().then(function(dbQuestion) {
      res.render("example", {
        text: dbQuestion.text
      });
    });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
