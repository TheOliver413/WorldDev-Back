const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event } = require('../db')

const { Op } = require('sequelize')

async function getServiceHname(){
    try {
        let servicesHFinded = await ServicesHotel.findAll()

        if(servicesHFinded){
            return servicesHFinded 
        }
            return 'No services hotel found'
    } catch (error) {
        console.log(error)
    }
}

async function getServiceById(id){
    try {
        let servicesHFinded = await ServicesHotel.findByPk(id)

        if(servicesHFinded){
            return servicesHFinded 
        }
            return 'No services found'
    } catch (error) {
        console.log(error)
    }
}

async function getHotelServiceById(id){
    try {
        let hotelServicesFinded = await Hotel.findByPk(id,{ include: [{
            model: ServicesHotel,
            attributes: ['id','name','image','description'],
            through: {
                attributes: []
            }
        }]})

        if(hotelServicesFinded){
            return hotelServicesFinded.ServicesHotels
        }
            return 'No Services found'
    } catch (error) {
        console.log(error)
    }
}

async function createServiceH({ idHotel, name, description, image }) {
    try {

        let imagesData = []
    if(typeof image[0] === "string"){
        imagesData = image
    }else{
         imagesData = image.map(e => e.url)
    }

        let hotelFinded = await Hotel.findByPk(idHotel)
        
        let serviceHCreated = await ServicesHotel.create({
            name:name.trimStart().trimEnd(), 
            description:description, 
            image:imagesData[0]
        })
        
        hotelFinded.addServicesHotels(serviceHCreated)

        return 'ServiceH created'
    } catch (error) {
        console.log(error)
    }
}

async function updateServiceH({id, name, description, image}){
    
    let imagesData = []
    if(typeof image[0] === "string"){
        imagesData = image
    }else{
         imagesData = image.map(e => e.url)
    }

    await ServicesHotel.update({name:name.trimStart().trimEnd(), 
        description:description, 
        image:imagesData[0]},{
            where:{
                id: id
            }
    })
    return 'Update Succes'
}

async function deleteServiceH(id){
    await ServicesHotel.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}


module.exports = {
    getHotelServiceById,
    getServiceHname,
    getServiceById,
    createServiceH,
    updateServiceH,
    deleteServiceH
}