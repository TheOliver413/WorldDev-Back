const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Event', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.STRING
        },
        date:{
            type: DataTypes.DATE
        },
        time:{
            type: DataTypes.TIME
        },
    });
};