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
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function createServiceRoom({idRoom, name, image}) {
    try {
        let roomFinded = await Room.findByPk(idRoom)

        let serviceRoomCreated = await ServicesRoom.findOrCreate({ where: {name: {[Op.iLike]: name}}},{
            name: name, image:image
        })

        roomFinded.addServicesRoom(serviceRoomCreated)

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
    getAllServices, 
    getServiceRoomById,
     updateServiceRoom, 
     deleteServiceRoom
}