module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Question;
};
