const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event } = require('../db')

const { Op } = require('sequelize')

async function getAllServices(){
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
            return 'No services rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function createServiceRoom({id, name, image}) {
    try {
        let roomFinded = await Room.findByPk(id)

        let [serviceRoomCreated, serviceRoom] = await ServicesRoom.findOrCreate({where:{name: name},defaults:{
            name: name,
            image: image
        }})

        roomFinded.addServicesRooms(serviceRoomCreated)

        return 'Service Room created'
    } catch (error) {
        console.log(error)
    }
}

async function updateServiceRoom({id, name, image}){
    await ServicesRoom.update({
        id:id, name:name, image:image
    },{
        where:{id: id}
    })
    return 'Update Succes'
}

async function deleteServiceRoom(id){
    await ServicesRoom.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}


module.exports = {
    createServiceRoom, 
    getAllServices, 
    getServiceRoomById,
     updateServiceRoom, 
     deleteServiceRoom
}