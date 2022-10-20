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
            attributes: ['id','name','image','description', 'date','time'],
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
async function createEvent({ idHotel, name, description, image , date, time}) {
    try {
        let hotelFinded = await Hotel.findByPk(idHotel)

        let [eventCreated, servicesHo] = await Event.findOrCreate({where:{name},defaults:{
            name: name, 
            description: description, 
            image: image, 
            date: date,
            time: time
        }})

        hotelFinded.addEvents(eventCreated)

        return 'ServiceH created'
    } catch (error) {
        console.log(error)
    }
}

async function updateEvent({id, name, description, image,time}){
    await Event.update({
        name:name, description:description, image:image,time:time
    },{
        where:{id: id}
    })
    return 'Update Succes'
}

async function deleteEvent(id){
    await Event.destroy({
        where:{
            id: id
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