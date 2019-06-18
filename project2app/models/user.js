var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUnique: true,
      validate: {
        len: [1]
      }
    },
    userScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  User.associate = function(models) {
    User.hasMany(models.UserAnswer, {
      foreignKey: "UserAnswerId",
      onDelete: "cascade"
    });
  };
  User.associate = function(models) {
    User.belongsTo(models.Game, {
      foreignKey: "GameId",
      onDelete: "cascade"
    });
  };

  return User;
};
