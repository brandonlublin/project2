var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/questions/:id", function(req, res) {
    db.Questions.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(getQuestionDb) {
      res.json(getQuestionDb);
    });
  });
  // Create a new example
  app.post("/api/answers", function(req, res) {
    db.Questions.create(req.body).then(function(userAnsDb) {
      res.json(userAnsDb);
    });
  });
};
