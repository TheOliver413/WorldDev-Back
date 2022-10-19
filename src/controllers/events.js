const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event } = require('../db')

const { Op } = require('sequelize')

async function getEvent(){
    try {
        let eventFinded = await Event.findAll()

        if(eventFinded){
            return eventFinded 
        }
            return 'No events hotel found'
    } catch (error) {
        console.log(error)
    }
}

async function getEventById(id){
    try {
        let eventFinded = await Event.findByPk(id)

        if(eventFinded){
            return eventFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function getHotelEventsById(id){
    try {
        let hotelEventsFinded = await Hotel.findByPk(id,{ include: [{
            model: Event,
            attributes: ['id','name','image','description', 'date'],
            through: {
                attributes: []
            }
        }]})

        if(hotelEventsFinded){
            return hotelEventsFinded.Events
        }
            return 'No events found'
    } catch (error) {
        console.log(error)
    }
}
async function createEvent({ idHotel, name, description, image , date}) {
    try {
        let hotelFinded = await Hotel.findByPk(idHotel)

        let [eventCreated, servicesHo] = await Event.findOrCreate({where:{name},defaults:{
            name: name, 
            description: description, 
            image: image, 
            date: date
        }})

        hotelFinded.addEvents(eventCreated)

        return 'ServiceH created'
    } catch (error) {
        console.log(error)
    }

}

async function updateEvent({idHotel, name, description, image}){
    await Event.update({
        id:idHotel, name:name, description:description, image:image
    },{
        where:{id: idHotel}
    })
    return 'Update Succes'
}

async function deleteEvent(idHotel){
    await Event.destroy({
        where:{
            id: idHotel
        }
    })
    return 'Deleted'
}


module.exports = {
    createEvent, 
    getEvent, 
    getEventById, 
    updateEvent, 
    deleteEvent,
    getHotelEventsById
}