module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: DataTypes.TEXT
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
