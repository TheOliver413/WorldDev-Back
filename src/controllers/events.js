const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event,Hotel_Event } = require('../db')

const { Op } = require('sequelize')

async function getEvent(){
    try {
        let eventFinded = await Event.findAll({include: {
            model: Hotel,
            attributes: ["id","name", "address"],
            through: {
                attributes: []
            },
            include: {
                model: Location,
                attributes: ["id","state", "department", "city"],
                through: {
                    attributes: []
                }}
        }})

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
        },{
            model: Location,
            attributes: ['city', 'state','department'],
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
        let imagesData = []
        if(typeof image[0] === "string"){
            imagesData = image
        }else{
             imagesData = image?.map(e => e.url)
        }
        let eventCreated = await Event.create({
            name: name.trimStart().trimEnd(), 
            description: description, 
            image: imagesData[0], 
            date: date,
            time: time
        })

        hotelFinded.addEvents(eventCreated)

        return 'ServiceH created'
    } catch (error) {
        console.log(error)
    }
}

async function updateEvent({id,idHotel, name, description, image,date,time}){

    let imagesData = []
    if(typeof image[0] === "string"){
        imagesData = image
    }else{
         imagesData = image?.map(e => e.url)
    }

    await Event.update({
        name:name.trimStart().trimEnd(), 
        description:description, 
        image:imagesData[0],
        date:date,
        time: time
    },{
            where:{
                id: id
            }
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