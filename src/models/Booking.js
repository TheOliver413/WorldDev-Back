const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Booking', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        cartTotalQuantity: {
            type: DataTypes.INTEGER
        },
        cartTotalAmount:{
            type: DataTypes.INTEGER
        },
        checkIn:{
            type: DataTypes.DATE
        },
        checkOut:{
            type: DataTypes.DATE
        },
        stock: {
            type: DataTypes.INTEGER 
        }
    });
};