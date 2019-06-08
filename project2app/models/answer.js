module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: DataTypes.TEXT
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
