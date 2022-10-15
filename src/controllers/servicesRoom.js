const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event } = require('../db')

const { Op } = require('sequelize')

async function getServiceRoomByName(){
    try {
        let servicesRoomFinded = await ServicesRoom.findAll()

        if(servicesRoomFinded){
            return servicesRoomFinded 
        }
            return 'No services room found'
    } catch (error) {
        console.log(error)
    }
}

async function getServiceRoomById(id){
    try {
        let servicesRoomFinded = await ServicesRoom.findByPk(id)

        if(servicesRoomFinded){
            return servicesRoomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function createServiceRoom({idRoom, name, image}) {
    try {
        let roomFinded = await Room.findByPk(idRoom)

        let serviceRoomCreated = await ServicesRoom.create({
            name: name, image:image
        })

        roomFinded.addServicesRoom(serviceRoomCreated)

        return 'Service Room created'
    } catch (error) {
        console.log(error)
    }

}

async function updateServiceRoom({idRoom, name, image}){
    await ServicesRoom.update({
        id:idRoom, name:name, image:image
    },{
        where:{id: idRoom}
    })
    return 'Update Succes'
}

async function deleteServiceRoom(idRoom){
    await ServicesRoom.destroy({
        where:{
            id: idRoom
        }
    })
    return 'Deleted'
}


module.exports = {
    createServiceRoom, 
    getServiceRoomByName, 
    getServiceRoomById,
     updateServiceRoom, 
     deleteServiceRoom
}