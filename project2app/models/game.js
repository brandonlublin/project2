var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    userIds: {
      type: DataTypes.STRING,
      allowNull: false
    },
    triviaIds: DataTypes.STRING,
    userCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    round: DataTypes.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  // Game.associate = function(models) {
  //   Game.hasMany(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };
  // Game.associate = function(models) {
  //   Game.hasMany(models.Trivia, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Game;
};
