require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DATABASE_URL,
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  //CONFIGURACION ADICIONAL
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Hotel , Location, ServicesHotel, ServicesRoom, Room, Event, Booking, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//UNO A MUCHOS
// Room.hasMany(CategoryRoom,{foreignKey: "CategoryId"});
// CategoryRoom.belongsTo(Room);

//MUCHOS A MUCHOS

Hotel.belongsToMany(Review, {through: 'Hotel_Review'})
Review.belongsToMany(Hotel, {through: 'Hotel_Review'})

Room.belongsToMany(Booking, {through: 'Room_Booking'})
Booking.belongsToMany(Room, {through: 'Room_Booking'})

Hotel.belongsToMany(Location, {through: 'Hotel_Location'})
Location.belongsToMany(Hotel, {through: 'Hotel_Location'})

Hotel.belongsToMany(ServicesHotel, {through: 'Hotel_Services'})
ServicesHotel.belongsToMany(Hotel, {through: 'Hotel_Services'})

Hotel.belongsToMany(Room, {through: 'Hotel_Room'})
Room.belongsToMany(Hotel, {through: 'Hotel_Room'})

Room.belongsToMany(ServicesRoom, {through: 'Room_Services'})
ServicesRoom.belongsToMany(Room, {through: 'Room_Services'})

Hotel.belongsToMany(Event,{through: 'Hotel_Event'})
Event.belongsToMany(Hotel,{through: 'Hotel_Event'})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
