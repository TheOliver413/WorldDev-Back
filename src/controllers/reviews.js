const { Hotel, Location, ServicesHotel, ServicesRoom, Room, Event,Hotel_Event, Review} = require('../db')

const { Op } = require('sequelize')

async function getHotelReviewsById(id){
    try {
        console.log(id)
        let hotelReviewsFinded = await Hotel.findByPk(id,{ include: [{
            model: Review,
            attributes: ['id', "name", "rating", "comment", "user"],
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

        if(hotelReviewsFinded){
            return {hotel: hotelReviewsFinded.name ,reviews: hotelReviewsFinded.Reviews}
        }
            return 'No reviews found'
    } catch (error) {
        console.log(error)
    }
}

async function createReview({ idHotel, name, rating, comment, user}){
try {
    let hotelFinded = await Hotel.findByPk(idHotel)

    let reviewCreated = await Review.create({
        name:name, 
        rating:rating, 
        comment:comment, 
        user:user
    })

    hotelFinded.addReviews(reviewCreated)

    return 'Review created'
} catch (error) {
    console.log(error)
}
}

async function deleteReview(id){
    await Review.destroy({
        where:{
            id: id
        }
    })
    return 'Deleted'
}

module.exports = {
    createReview,
    deleteReview,
    getHotelReviewsById
}