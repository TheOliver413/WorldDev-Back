const { Booking, Room } = require('../db')

const postBooking = async ({ cartTotalQuantity, cartTotalAmount, cartRoom, user, status}) => {
    try {
        const bookCreate = await Booking.create({ cartTotalQuantity, cartTotalAmount, cartRoom,user, status})

            for (let i = 0; i < cartRoom.length; i++) {
                let roomFind = await Room.findByPk(cartRoom[i].id)
                bookCreate.addRooms(roomFind)
            }
            return bookCreate;
        

    } catch (error) {
        console.log(error)
    }
}

const getAllBooking = async () => {
    try {
        const allBooking = await Booking.findAll({
            include:{
                model: Room,
                attributes: ['id','name','discount','price', 'available', 'category'],
                through:{
                    attributes:[],
                }
            }
        })
        if (allBooking.length) return allBooking
        else return []
       

    } catch (error) {
        console.log(error)
    }
}

const getBookingById = async (id) => {
    try {
        const bookFinded = await Booking.findByPk(id, {
            include:{
                model: Room,
                attributes: ['id','name','discount', 'price', 'available', 'category'],
                through:{
                    attributes:[],
                }
            }
        })
        if (bookFinded) return bookFinded
        else return 'Booking not found'

    } catch (error) {
        console.log(error)
    }
}

const getBookingsByUserId = async (id) => {
    try {
        const bookFinded = await Booking.findAll({ where: {user: id}})
        if (bookFinded) return bookFinded
        else return 'Booking not found'

    } catch (error) {
        console.log(error)
    }
}

const modifyBooking = async (body) => {
    try {
        const id = body.id
        delete body.id
        let bookFind = await Booking.findByPk(id)
        if(bookFind){
            bookFind.status = body.status
        }
        await bookFind.save()
         return 'Booking updated!'
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postBooking,
    getAllBooking,
    getBookingById,
    modifyBooking,
    getBookingsByUserId
}