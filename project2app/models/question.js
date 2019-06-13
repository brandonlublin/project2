module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Question;
};
