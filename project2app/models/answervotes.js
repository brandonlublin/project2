var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var AnswerVotes = sequelize.define("AnswerVote", {
    answerIds: DataTypes.STRING,
    triviaIds: DataTypes.STRING,
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  AnswerVotes.associate = function(models) {
    AnswerVotes.belongsTo(models.UserAnswer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return AnswerVotes;
};
