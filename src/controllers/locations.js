const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event, Hotel_Location} = require('../db')

const { Op } = require('sequelize')

async function getAllStates(){
    let locations = await Location.findAll()
    let states = locations.map(e => e.state)
    let aux = new Set(states)
    let aux2 = aux.values()
    states = Array.from(aux2);
    return states
}

async function getAllDepartamentByState(state){
    let states = await Location.findAll({where:{state:state}})
    let departments = states.map(e => e.department)
    let aux = new Set(departments)
    let aux2 = aux.values()
    departments = Array.from(aux2);
    return departments
}

async function getAllCitysByDepartment(department){
    let locations = await Location.findAll({where:{department:department}})
    let aux = new Set(locations)
    let aux2 = aux.values()
    citys = Array.from(aux2);
    return citys
}

async function addLocationToHotel({idHotel, idLocation}){
     let hotelFinded = await Hotel.findByPk(idHotel)
     let locationFinded = await Location.findByPk(idLocation)
     hotelFinded.addLocation(locationFinded)
}

module.exports = {
  getAllStates,
  addLocationToHotel,
  getAllDepartamentByState,
  getAllCitysByDepartment
}