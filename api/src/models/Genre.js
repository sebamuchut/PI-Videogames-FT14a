const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
      unique: true
    },

    name: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        unique: true
        
    }
    
  });
};