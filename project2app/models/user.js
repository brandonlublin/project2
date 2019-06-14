module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Answer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
: