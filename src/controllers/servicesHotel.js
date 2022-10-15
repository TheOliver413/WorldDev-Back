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

async function getServiceHById(id){
    try {
        let servicesHFinded = await ServicesHotel.findByPk(id)

        if(servicesHFinded){
            return servicesHFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

async function createServiceH({ idHotel, name, description, image }) {
    try {
        let hotelFinded = await Hotel.findByPk(idHotel)

        let [serviceHCreated, servicesHo] = await ServicesHotel.findOrCreate({where:{name},defaults:{
            name: name, description:description, image:image
        }})
        // let [locationCreated, locationC] = await Location.findOrCreate({where:{city},defaults:{
        //     city, continent, country
        // }})

        hotelFinded.addServicesHotels(serviceHCreated)
        // hotelFinded.addServicesRooms(servicesFinded)

        return 'ServiceH created'
    } catch (error) {
        console.log(error)
    }

}

async function updateServiceH({idHotel, name, description, image}){
    await ServicesHotel.update({
        id:idHotel, name:name, description:description, image:image
    },{
        where:{id: idHotel}
    })
    return 'Update Succes'
}

async function deleteServiceH(idHotel){
    await ServicesHotel.destroy({
        where:{
            id: idHotel
        }
    })
    return 'Deleted'
}


module.exports = {
    getServiceHname,
    getServiceHById,
    createServiceH,
    updateServiceH,
    deleteServiceH
}