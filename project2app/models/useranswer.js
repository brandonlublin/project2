var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var UserAnswer = sequelize.define("UserAnswer", {
    userAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: DataTypes.STRING,
    createdAt: {
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    },
    updatedAt: {  
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    }
  });

  UserAnswer.associate = function(models) {
    UserAnswer.belongsTo(models.Trivia, {
      foreignKey: {
        allowNull: false
      }
    });
    UserAnswer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    UserAnswer.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return UserAnswer;
};
