const {Hotel , Location, ServicesHotel, ServicesRoom, Room,Event} = require('../db')

const {Op} = require('sequelize')


async function getHotelByName(name){
    try {
        let hotelFinded = await Hotel.findAll({ where: {name: {[Op.iLike]: `%${name}%`}},
        include: [{
            model: Location,
            attributes: ['city', 'state','department'],
            through: {
                attributes: []
            }
        },{
            model: Room,
            attributes: ['id','name','image','discount','price','description','available','category'],
            through: {
                attributes: []
            }
        },{
            model: ServicesHotel,
            attributes: ['id','name','image','description'],
            through: {
                attributes: []
            }
        },{
            model: Event,
            attributes: ['id','name','image','description', 'date','time'],
            through: {
                attributes: []
            }
        }]})
        
        if(hotelFinded.length > 0){
            return hotelFinded 
        }
        throw new Error('No hotels found!', { statusCode: 404 })
    } catch (error) {
        console.log(error)
    }
}

async function getAllHotels(){
    try {  
    let hotelsAll = await Hotel.findAll({ include: [{
        model: Location,
        attributes: ['city', 'state','department'],
        through: {
            attributes: []
        }
    },{
        model: Room,
        attributes: ['id','name','image','discount','price','description','available','category'],
        through: {
            attributes: []
        }
    },{
        model: ServicesHotel,
        attributes: ['id','name','image','description'],
        through: {
            attributes: []
        }
    },{
        model: Event,
        attributes: ['id','name','image','description', 'date','time'],
        through: {
            attributes: []
        }
    }]})

    let result =  hotelsAll ? hotelsAll : 'No hotels found'
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getHotelById(id){
    try {
        let hotelFinded = await Hotel.findByPk(id,{ include: [{
            model: Location,
            attributes: ['city', 'state','department'],
            through: {
                attributes: []
            }
        },{
            model: Room,
            attributes: ['id','name','image','discount','price','description','available','category'],
            through: {
                attributes: []
            }
        },{
            model: ServicesHotel,
            attributes: ['id','name','image','description'],
            through: {
                attributes: []
            }
        },{
            model: Event,
            attributes: ['id','name','image','description', 'date','time'],
            through: {
                attributes: []
            }
        }]})

        if(hotelFinded){
            return hotelFinded 
        }
            return 'No hotels found'
    } catch (error) {
        console.log(error)
    }
}

async function createHotel({name, image, qualification, description, idLocation , servicesHotel, event}){

    let [hotelCreated, hotelC] = await Hotel.findOrCreate({where:{name:name},defaults:{
        name, image, qualification, description
    }})

    if(servicesHotel){
        servicesHotel.map(async (e) => {
            let [servicesCreated, servicesH] = await ServicesHotel.findOrCreate({where:{name: e.name},defaults:{
            name: e.name,
            description: e.description,
            image: e.image
        }})
            hotelCreated.addServicesHotels(servicesCreated) 
        })
        
    }

    if(idLocation){
        let locationFinded= await Location.findByPk(idLocation)
        hotelFinded.addLocation(locationFinded)
        }


    // let eventFinded = await Event.findAll({where: {name: event}})

    
    // hotelCreated.addEvents(eventFinded)

    return hotelCreated
}

async function updateHotel({id,name, image, qualification, description, idLocation, servicesHotel, event}){

    let hotelFinded = await Hotel.findByPk(id,{include: [{
        model: Location,
        attributes: ['city', 'state','department'],
        through: {
            attributes: []
        }
    }]},{new: true})
    Hotel_Location.destroy({where:{HotelId: id}})

    if(hotelFinded){
        hotelFinded.name = name
        hotelFinded.image = image
        hotelFinded.qualification = qualification
        hotelFinded.description = description
    }
    if(idLocation){
    let locationFinded= await Location.findByPk(idLocation)
    hotelFinded.addLocation(locationFinded)
    }
    
    await hotelFinded.save()
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