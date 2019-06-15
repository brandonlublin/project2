module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    text: {
      Question: DataTypes.STRING,
      allowNull: true
    }
  });
  return Question;

  //Need to insert sample into question table
};
