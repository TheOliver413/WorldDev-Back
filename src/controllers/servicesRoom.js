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

async function createServiceRoom({name, image}) {
    try {
        await ServicesRoom.findOrCreate({where:{name: name},defaults:{
            name: name,
            image: image
        }})
        return 'Service Room created'
    } catch (error) {
        console.log(error)
    }
}

async function updateServiceRoom({id, name, image}){
    await ServicesRoom.update({
       name:name, image:image
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