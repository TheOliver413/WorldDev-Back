const {Hotel , Location, ServicesHotel, ServicesRoom, Room, Room_Services, Booking} = require('../db')
const {Op} = require('sequelize')

async function getRoomsByName(){
    try {
        let roomFinded = await Room.findAll({include: [{
            model: ServicesRoom,
            attributes: ['id', 'name','image'],
            through: {
                attributes: []
            }
        },{model: Hotel,
        attributes: ["id","name", "image", "qualification", "description", "address"],
        through: {
            attributes: []
        }
    }]})

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}

//Busca el hotel por ID y trae las rooms de ese hotel
async function getAllRoomsOfHotel(id){
    try {  
        let hotelFinded = await Hotel.findByPk(id,{ include:{
            model: Room,
            attributes: ['id','name','image','discount','price','description','available','category','stock'],
            through: {
                attributes: []
            }
        }})

    let roomsAll = hotelFinded.Rooms

    let result =  roomsAll ? roomsAll : 'No rooms found'
        return result
    } catch (error) {
        console.log(error)
    }
}
//Busca una room por ID
async function getRoomById(id){
    try {
        let roomFinded = await Room.findByPk(id,{include: [{
            model: ServicesRoom,
            attributes: ['id', 'name','image'],
            through: {
                attributes: []
            }
        },{model: Hotel,
        attributes: ["id","name", "image", "qualification", "description", "address"],
        through: {
            attributes: []
        }},{model: Booking,
            attributes: ["id","cartTotalQuantity", "cartTotalAmount", "cartRoom", "user", "status"],
            through: {
                attributes: []
            }
        
    }]})

        if(roomFinded){
            return roomFinded 
        }
            return 'No rooms found'
    } catch (error) {
        console.log(error)
    }
}
//----------------------Crea una room-----------------------------
async function createRoom({id,name, image, discount, description, price, available, services, category, stock}){
    try {
        let hotelFinded = await Hotel.findByPk(id)

        let imagesData = []
        if(typeof image[0] === "string"){
            imagesData = image
        }else{
             imagesData = image.map(e => e.url)
        }

    let roomCreated = await Room.create({
        name:name.trimStart().trimEnd(), 
        image:imagesData, 
        discount:discount, 
        description:description, 
        price:price, 
        available:available,
        category:category,
        stock:stock
    })

     if(services.length > 0){
        for (let i = 0; i < services.length; i++) {
    
            let servicesFinded = await ServicesRoom.findAll({where: {name: services[i]}})
            roomCreated.addServicesRooms(servicesFinded)
        }
    }

    hotelFinded.addRoom(roomCreated)  

    return 'Room created'
    } catch (error) {
        console.log(error)
    }

}

async function updateRoom({id,name, image, discount, description, price,available,category, services,stock}){

    let imagesData = []
    if(typeof image[0] === "string"){
        imagesData = image
    }else{
         imagesData = image.map(e => e.url)
    }

    let roomFinded = await Room.findByPk(id,{include: [{
                model: ServicesRoom,
                attributes: ['name', 'image'],
                through: {
                    attributes: []
                }
            }]},{new: true})

            Room_Services.destroy({where:{RoomId: id}})

    if(roomFinded){
        roomFinded.name = name.trimStart().trimEnd()
        roomFinded.image = imagesData
        roomFinded.price = price
        roomFinded.description = description
        roomFinded.discount = discount
        roomFinded.available = available
        roomFinded.category = category
        roomFinded.stock = stock
    }

    if(services.length > 0){
        for (let i = 0; i < services.length; i++) {
    
            let servicesFinded = await ServicesRoom.findAll({where: {name: services[i]}})
            roomFinded.addServicesRooms(servicesFinded)
        }
    }

    await roomFinded.save()

    return 'Update Succes'
}

async function deleteRoom(id){
    await Room.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}

module.exports = {
    getRoomsByName,
    getAllRoomsOfHotel,
    getRoomById,
    createRoom,
    deleteRoom,
    updateRoom
}