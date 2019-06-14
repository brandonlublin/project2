module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    userAnswer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: DataTypes.STRING
  });

  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};
