var db = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get('/api/trivia/:id', function(req, res) {
    db.Questions.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(getQuestionDb) {
      res.json(getQuestionDb);
    });
  });
  // Create a new example

  app.post('/api/useranswer/', function(req, res) {
    console.log(req.body);
    db.UserAnswer.create({
      userAnswer: req.body.userAnswer,
      TriviumId: parseInt(req.body.questionId),
      UserId: parseInt(req.body.userId),
      GameId: parseInt(req.body.gameId),
      username: req.body.username,
    }).then(function(response) {
      // console.log(response.dataValues);
      db.UserAnswer.findAll({
        where: {
          GameId: parseInt(req.body.gameId),
          TriviumId: parseInt(req.body.questionId),
        },
      }).then(function(triviaRes) {
        if (triviaRes.length < 4) {
          res.json(false);
        } else {
          res.json(true);
        }
      });
    });
  });

  app.get('/api/useranswer/:gameid/:questionid', function(req, res) {
    db.UserAnswer.findAll({
      where: {
        GameId: parseInt(req.params.gameid),
        TriviumId: parseInt(req.params.questionid),
      },
    }).then(function(triviaRes) {
      if (triviaRes.length < 4) {
        res.json(false);
      } else {
        res.json(true);
      }
    });
  });

  app.post('/api/user', function(req, res) {
    db.Game.findOne({
      where: {
        userCount: { [op.lt]: 4 },
      },
      order: [['createdAt', 'ASC']],
    }).then(function(game) {
      if (game === null) {
        //query trivia
        //query trivia table
        db.Trivia.findAll().then(function(trivia) {
          //match the game id with the questions for that game in the trivia table
          matchGameIds(trivia, function(triviaIds) {
            //run validate game capacity function(ensures there are 4 players in the game)
            validateGameCapacity(triviaIds, function(triviaGameIds) {
              //create game for user
              db.Game.create({
                triviaIds: triviaGameIds,
              }).then(function(game) {
                //create user for game
                createNewUser(req, game, res);
              });
            });
          });
        });
      } else {
        //if no game found, just create new user
        createNewUser(req, game, res);
      }
    });
  });

  // check user count to move users into game
  app.get('/api/game/:id/status', function(req, res) {
    db.Game.findByPk(req.params.id).then(function(game) {
      var gameUserCount = game.dataValues.userCount;
      if (gameUserCount > 3) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  });
};

function matchGameIds(trivia, cd) {
  let triviaIds = [];

  trivia.forEach(function(question) {
    triviaIds.push(question.dataValues.id);
  });

  cd(triviaIds);
}

function validateGameCapacity(triviaIds, cb) {
  let triviaGameIds = [];

  while (triviaGameIds.length < 4) {
    let index = Math.floor(Math.random() * (triviaIds.length - 1));
    let id = triviaIds[index];

    if (!triviaGameIds.includes(id)) {
      triviaGameIds.push(id);
    }
  }

  triviaGameIds = triviaGameIds.toString();
  cb(triviaGameIds);
}

function createNewUser(req, game, res) {
  console.log(req);
  //update User table with username and sync with game ID they are joining
  db.User.create({
    username: req.body.username,
    GameId: game.dataValues.id,
  }).then(function(user) {
    updateGameUser(user.dataValues, game.dataValues, res);
  });
}

function updateGameUser(user, game, res) {
  var newUserIds;
  if (game.userIds) {
    var prevUserId = game.userIds;
    newUserIds = prevUserId + ',' + user.id;
  } else {
    newUserIds = user.id.toString();
  }
  var newCount = parseInt(game.userCount) + 1;

  db.Game.update(
    {
      userIds: newUserIds,
      userCount: newCount,
      round: 1,
    },
    {
      where: {
        id: game.id,
      },
    }
  ).then(function(updatedGame) {
    console.log(updatedGame);
    // if newCount is 4 or more than start new game;
    if (newCount > 3) {
      res.json({
        gameid: game.id,
        userid: user.id,
        status: true,
        username: user.username,
      });
    } else {
      res.json({
        gameid: game.id,
        userid: user.id,
        status: false,
        username: user.username,
      });
    }
    // else show loading message to user waiting for more users to join
  });
}
