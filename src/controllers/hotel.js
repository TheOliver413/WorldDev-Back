const {Hotel , Location, ServicesHotel, ServicesRoom, Room, CategoryRoom,Event} = require('../db')

const {Op} = require('sequelize')


async function getHotelByName(name){
    try {
        let hotelFinded = await Hotel.findOne({ where: {name: {[Op.iLike]: `%${name}%`}}})
        
        if(hotelFinded){
            return hotelFinded 
        }
            return 'No hotels found'
    } catch (error) {
        console.log(error)
    }
}

async function getAllHotels(){
    try {  
    let hotelsAll = await Hotel.findAll()

    let result =  hotelsAll ? hotelsAll : 'No hotels found'
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getHotelById(id){
    try {
        let hotelFinded = await Hotel.findByPk(id)

        if(hotelFinded){
            return hotelFinded 
        }
            return 'No hotels found'
    } catch (error) {
        console.log(error)
    }
}

async function createHotel({name, image, qualification, description, city, continent, country, servicesHotel, event}){

    let [hotelCreated, hotelC] = await Hotel.findOrCreate({where:{name:name},defaults:{
        name, image, qualification, description
    }})
    
    let [locationCreated, locationC] = await Location.findOrCreate({where:{city},defaults:{
        city, continent, country
    }})
    
    // let servicesFinded = await ServicesHotel.findAll({where: {name: servicesHotel}})
    // let eventFinded = await Event.findAll({where: {name: event}})

    // hotelCreated.addServicesHotels(servicesFinded)
    // hotelCreated.addEvents(eventFinded)
    hotelCreated.addLocation(locationCreated)

    return 'Hotel created'
}

async function updateHotel({id,name, image, qualification, description, city, continent, country, servicesHotel, event}){

    await Hotel.update({
        name:name,
        image: image, 
        qualification:qualification, 
        description:description
    },{where:{id: id}})
    return 'Update Succes'
}

async function deleteHotel(id){
    await Hotel.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}









module.exports = {
    getAllHotels,
    getHotelByName,
    getHotelById ,
    createHotel, 
    updateHotel, 
    deleteHotel
}