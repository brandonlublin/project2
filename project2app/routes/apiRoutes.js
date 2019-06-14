var db = require("../models");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get("/api/trivia/:id", function(req, res) {
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

  app.post("/api/user", function(req, res) {
    console.log("this is hit");
    db.Game.findOne({
      where: {
        userCount: { [op.lt] : 6 }
      },
      order: [[
        "createdAt", "ASC"
      ]]
    }).then(function(game) {
      if (game === null) {
        //query trivia 
        db.Trivia.findAll().then(function(trivia) {
          // console.log(trivia);
          let triviaIds = [];
          // let counter = 0;
          trivia.forEach(function(question) {
            triviaIds.push(question.dataValues.id);
          })
          // let triviaGameIds = [];
          // while (counter < 4) {
          //   let index = Math.floor(Math.random() * (4 - 1))
          //   let id = triviaIds[index];
          //   triviaGameIds.push(id);
          // }
          triviaIds = triviaIds.toString()

          
          db.Game.create({
            triviaIds: triviaIds
          }).then(function(game) {
            db.User.create({
              username: req.body.username,
              gameId: game.dataValues.id
            }).then(function(user) {
              console.log(user);
              
            })
          })
        })
        //pick 4 random indexes 
        //push ids of indexes into an array
        //convert array to string
        //create game
        
        //create user
        //update game with users

        // db.Game.create(req.body)
      } else {
        let userIds = game.dataValues.userIds;
        db.User.create({
          username: req.body.username,
          gameId: game.dataValues.id
        }).then(function(newUser) {
          console.log(newUser);
          userIds = userIds + newUser.dataValues.id;
          db.Game.update({ //we want to append the user id to the existing string of user ids (look into appending onto the end of a value in sequelize)
            userIds: userIds,
            where: {
              id: game.dataValues.id
            }
          }).then(function(updatedGame) {
            console.log(updatedGame.dataValues);
            
          })
        })
      }
      
    })
    
  })
};
