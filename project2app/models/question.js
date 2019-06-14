module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    questionText: DataTypes.STRING,
    questionAnswer: DataTypes.TEXT
  });
  return Question;
};
