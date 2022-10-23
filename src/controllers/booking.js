const { Booking, Room } = require('../db')

const postBooking = async ({ idRoom, cartTotalQuantity, cartTotalAmount, checkIn, checkOut, stock }) => {
    try {
        const bookCreate = await Booking.create({ cartTotalQuantity, cartTotalAmount, checkIn, checkOut, stock })

        if (idRoom.length > 1) {
            for (let i = 0; i < idRoom.length; i++) {
                const roomFind = await Room.findByPk(idRoom[i])
                bookCreate.addRoom(roomFind)
            }
            return bookCreate;
        }

        const roomFind = await Room.findByPk(idRoom[0])
        bookCreate.addRoom(roomFind)
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
        else return 'Booking not found'

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


module.exports = {
    postBooking,
    getAllBooking,
    getBookingById
}