'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    url: DataTypes.STRING,
    user_uuid: DataTypes.UUID
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};