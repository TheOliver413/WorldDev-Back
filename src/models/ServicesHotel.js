const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('ServicesHotel', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        description: {
            type: DataTypes.TEXT,
        },
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
};