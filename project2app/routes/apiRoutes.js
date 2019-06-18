var db = require("../models");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get("/api/trivia/:id", function(req, res) {
    db.Trivia.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(getQuestionDb) {
      res.json(getQuestionDb);
    });
  });
  // Create a new example
  app.post("/api/answers", function(req, res) {
    db.Trivia.create(req.body).then(function(userAnsDb) {
      res.json(userAnsDb);
    });
  });
  
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
      },
      order: [[
        "createdAt", "ASC"
      ]]
    }).then(function(game) {
      if (game === null) {
        //query trivia 
        db.Trivia.findAll().then(function(trivia) {
        test1(trivia, function(triviaIds){
        
          test(triviaIds, function(triviaGameIds){
            db.Game.create({
              triviaIds: triviaGameIds
            }).then(function(game) {
              createNewUser(req, game, res)

            })
          
          })
        })
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
