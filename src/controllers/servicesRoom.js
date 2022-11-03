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

        let imagesData = []
        if(typeof image[0] === "string"){
            imagesData = image
        }else{
             imagesData = image.map(e => e.url)
        }

        await ServicesRoom.findOrCreate({where:{name: name},defaults:{
            name: name.trimStart().trimEnd(),
            image: imagesData[0]
        }})
        return 'Service Room created'
    } catch (error) {
        console.log(error)
    }
}

async function updateServiceRoom({id, name, image}){

    let imagesData = []
    if(typeof image[0] === "string"){
        imagesData = image
    }else{
         imagesData = image.map(e => e.url)
    }
    await ServicesRoom.update({
       name:name.trimStart().trimEnd(), image:imagesData[0]
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