var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Trivia = sequelize.define("Trivia", {
    triviaText: DataTypes.STRING,
    triviaAnswer: DataTypes.TEXT,
    createdAt: {
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    },
    updatedAt: {  
      type: Sequelize.DATE, 
      defaultValue: Sequelize.NOW 
    }
  });

  Trivia.associate = function(models) {
    Trivia.hasMany(models.UserAnswer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Trivia;
};
