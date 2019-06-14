module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUnique: true,
      validate: {
        len: [1]
      },
    },
    userScore: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.UserAnswer, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  User.associate = function(models) {
    User.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  return User;
};