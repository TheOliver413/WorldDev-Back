const {Hotel , Location, ServicesHotel, ServicesRoom, Room, CategoryRoom} = require('../db')

async function getRoomsByName(name){
    try {
        let roomFinded = await Room.findOne({where: {name: name}})

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function getAllRooms(){
    try {  
    let roomsAll = await Room.findAll()

    let result =  roomsAll.lenght > 0 ? roomsAll : 'No rooms found'
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getRoomById(id){
    try {
        let roomFinded = await Room.findByPk(id)

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function createRoom({idHotel,name, image, discount, description, price, available, servicesRoom, categoryRoom}){
    let hotelFinded = await Hotel.findByPk(idHotel)

    let roomCreated = await Room.create({
        name, image, discount, description, price, available
    })
    let servicesFinded = await ServicesRoom.findAll({where: {name: servicesRoom}})
    let categoryFinded = await CategoryRoom.findAll({where: {name: categoryRoom}})

    hotelFinded.addRoom(roomCreated)
    hotelFinded.addServicesRooms(servicesFinded)
    hotelFinded.addCategoryRoom(categoryFinded)

    return 'Room created'
}

async function updateRoom({id,name, image, discount, description, price}){
    await Room.update({
        name, image, discount, description, price
    },{
        where:{_id: id}
    })
    return 'Update Succes'
}

async function deleteRoom(id){
    await Room.destroy({
        where:{
            _id: id
        }
    })
    return 'Deleted'
}

module.exports = {
    getRoomsByName,
    getAllRooms,
    getRoomById,
    createRoom,
    deleteRoom,
    updateRoom
}