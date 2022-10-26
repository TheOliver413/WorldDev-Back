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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cartTotalAmount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        checkIn:{
            type: DataTypes.DATE,
            allowNull: false
        },
        checkOut:{
            type: DataTypes.DATE,
            allowNull: false
        },
        stock: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
            defaultValue: []
        }
    });
};