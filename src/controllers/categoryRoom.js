const {Room, Hotel} = require('../db')

async function getCategoryRoomByName(name){
        try {
            let roomFinded = await Room.findOne({where: {category: name}},{attributes: ["category"]})
            if(roomFinded){
                return roomFinded 
            }
                return 'No rooms found'
        } catch (error) {
            console.log(error)
        }
}


module.exports = {
    getCategoryRoomByName,
}