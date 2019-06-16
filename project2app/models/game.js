<<<<<<< HEAD
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    userIds: {
      type: DataTypes.STRING,
      allowNull: false
    },
=======
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    userIds: DataTypes.STRING,
>>>>>>> 353cbe4b44c04b28c04700db55b79bd9de7c9553
    triviaIds: DataTypes.STRING,
    userCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    },
    updatedAt: {  
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    }
  });

  Game.associate = function(models) {
    Game.hasMany(models.User, {
      foreignKey: "UserId",
      onDelete: "cascade"
    });
  };
  
  // Game.associate = function(models) {
  //   Game.hasMany(models.Trivia, {
  //     foreignKey: "TriviaId",
  //     onDelete: "cascade"
  //   });
  // };

  return Game;
};
