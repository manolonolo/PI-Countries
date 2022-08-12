const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },

    difficulty: {
        type: DataTypes.INTEGER,
        isInt: true,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: true
      },

      duration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      season: {
        type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
        allowNull: true
      },
  },
  {
    timestamps: false
  });
};
