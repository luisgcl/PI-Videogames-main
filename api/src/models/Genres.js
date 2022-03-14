const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};