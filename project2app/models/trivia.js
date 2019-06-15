module.exports = function(sequelize, DataTypes) {
  var Trivia = sequelize.define("Trivia", {
    triviaText: DataTypes.STRING,
    triviaAnswer: DataTypes.TEXT
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
