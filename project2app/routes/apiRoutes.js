var db = require("../models");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

module.exports = function (app) {


  // Get One Question
  app.get("/api/Trivia/:id", function (req, res) {
    db.Trivia.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (getQuestionDb) {
      res.json(getQuestionDb);
    });
  });

  // // Get All User Answer
  app.get("/api/answers", function (req, res) {
    db.UserAnswer.findAll().then(function (getAnsDb) {
      res.json(getAnsDb);
    });
  });
  // Update user Answer table by ID
  app.post("/api/answers", function (req, res) {
    db.UserAnswer.create(req.body)
      .then(function (userAnsDb) {
      res.json(userAnsDb);
    });
  });

<<<<<<< HEAD
  app.post("/api/user", function (req, res) {
    console.log("this is hit");
    db.Game.findOne({
      where: {
        userCount: { [op.lt]: 6 }
=======
function test1(trivia, cd ){
  let triviaIds = []; 

  trivia.forEach(function(question) {
    triviaIds.push(question.dataValues.id);
  })

  cd(triviaIds)
}

function test(triviaIds, cb){
  let triviaGameIds = [];

  while (triviaGameIds.length < 4) {

    let index = Math.floor(Math.random() * (triviaIds.length - 1))
    let id = triviaIds[index];

    if(!triviaGameIds.includes(id)){
      triviaGameIds.push(id);
    } 
  }
  
  triviaGameIds = triviaGameIds.toString()
  cb(triviaGameIds)
}

  app.post("/api/user", function(req, res) {
    db.Game.findOne({
      where: {
        userCount: { [op.lt] : 4 }
>>>>>>> 353cbe4b44c04b28c04700db55b79bd9de7c9553
      },
      order: [
        "createdAt", "ASC"
      ]
    }).then(function (game) {
      if (game === null) {
        //query trivia 
<<<<<<< HEAD
        db.Trivia.findAll().then(function (trivia) {
          // console.log(trivia);
          let triviaIds = [];
          // let counter = 0;
          trivia.forEach(function (question) {
            triviaIds.push(question.dataValues.id);
          })
          let triviaGameIds = [];
          while (counter < 4) {
            let index = Math.floor(Math.random() * (4 - 1))
            let id = triviaIds[index];
            triviaGameIds.push(id);
          }
          triviaIds = triviaIds.toString()


          db.Game.create({
            triviaIds: triviaIds
          }).then(function (game) {
            db.User.create({
              username: req.body.username,
              gameId: game.dataValues.id
            }).then(function (user) {
              console.log(user);

=======
        db.Trivia.findAll().then(function(trivia) {
        test1(trivia, function(triviaIds){
        
          test(triviaIds, function(triviaGameIds){
            db.Game.create({
              triviaIds: triviaGameIds
            }).then(function(game) {
              createNewUser(req, game, res)

>>>>>>> 353cbe4b44c04b28c04700db55b79bd9de7c9553
            })
          
          })
        })
<<<<<<< HEAD
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
        }).then(function (newUser) {
          // console.log(newUser);
          userIds = userIds + newUser.dataValues.id;
          db.Game.update({ //we want to append the user id to the existing string of user ids (look into appending onto the end of a value in sequelize)
            userIds: userIds,
            where: {
              id: game.dataValues.id
            }
          }).then(function (updatedGame) {


          })
=======
>>>>>>> 353cbe4b44c04b28c04700db55b79bd9de7c9553
        })
      
      } 
      else {
        createNewUser(req, game, res)
      }

    })

  })
};

function createNewUser(req, game, res){
  console.log(req);
  
  db.User.create({
    username: req.body.username,
    GameId: game.dataValues.id
  }).then(function(user) {
    updateGameUser(user.dataValues, game.dataValues, res);
  })
}

function updateGameUser(user, game, res){
  var newUserIds;
  if(game.userIds) {
    var prevUserId = game.userIds;
    newUserIds = prevUserId +","+ user.id;
  } else {
    newUserIds =  user.id.toString();
  }
  var newCount = parseInt(game.userCount) + 1;

  db.Game.update(
    {
      userIds: newUserIds,
      userCount: newCount
    },
    {
    where: {
      id: game.id
    }
  })
  .then(function(updatedGame){
    console.log(updatedGame)
    // if newCount is 4 or more than start game;
    if(newCount > 3) {
      
      res.json({gameid: game.id, userid:user.id, status: true});
    } else {
      res.json({gameid: game.id, userid:user.id, status: false}); 
    }
    // else show loading message to user waiting for more users to join
  })
}
