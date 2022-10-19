const {Hotel , Location, ServicesHotel, ServicesRoom, Room} = require('../db')
const {Op} = require('sequelize')

async function getRoomsByName(){
    try {
        let roomFinded = await Room.findAll({include: {
            model: ServicesRoom,
            attributes: ['id', 'name','image'],
            through: {
                attributes: []
            }
        }})

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

//Busca el hotel por ID y trae las rooms de ese hotel
// async function getAllRoomsOfHotel(id){
//     try {  
//     let hotelFinded = await Hotel.findByPk(id)
//     let roomsAll = hotelFinded.getRooms()    

//     let result =  roomsAll ? roomsAll : 'No rooms found'
//         return result
//     } catch (error) {
//         console.log(error)
//     }
// }
//Busca una room por ID
async function getRoomById(id){
    try {
        let roomFinded = await Room.findByPk(id,{include: {
            model: ServicesRoom,
            attributes: ['id', 'name','image'],
            through: {
                attributes: []
            }
        }})

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}
//----------------------Crea una room-----------------------------
async function createRoom({id,name, image, discount, description, price, available, servicesRoom, category}){
    try {
        let hotelFinded = await Hotel.findByPk(id)

    let roomCreated = await Room.create({
        name, image, discount, description, price, available,category
    })
    
    let servicesFinded = await ServicesRoom.findAll({where: {name: servicesRoom}})

    hotelFinded.addServicesRooms(servicesFinded)

    hotelFinded.addRoom(roomCreated)  

    return 'Room created'
    } catch (error) {
        console.log(error)
    }
    
}

async function updateRoom({id,name, image, discount, description, price,available,category}){
    await Room.update({
        name, image, discount, description, price,available,category
    },{
        where:{id: id}
    })
    return 'Update Succes'
}

async function deleteRoom(id){
    await Room.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}

module.exports = {
    getRoomsByName,
    // getAllRoomsOfHotel,
    getRoomById,
    createRoom,
    deleteRoom,
    updateRoom
}