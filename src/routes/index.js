
const { Router } = require('express');
const router = Router();
const roomRoutes = require('../middlewares/roomRoutes')
const hotelRoutes = require('../middlewares/hotelRoutes')
const filtersHRoutes = require('../middlewares/filtersHRoutes')
const filtersRRoutes = require('../middlewares/filtersRRoutes')
const servicesHotel = require('../middlewares/servicesHotel')
const servicesRooms = require('../middlewares/servicesRoom')
const events = require('../middlewares/events')
const locations = require('../middlewares/locations')
const stripe = require('../middlewares/stripe')
const booking = require('../middlewares/bookingRoutes')
const users = require('../middlewares/users')
const favorites = require('../middlewares/favorites')
const reviews = require('../middlewares/reviews')
const books = require('../middlewares/book')

router.use('/filtersHotels', filtersHRoutes)
router.use('/filtersRooms', filtersRRoutes)
router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)
router.use('/serviceHotels', servicesHotel)
router.use('/serviceRooms', servicesRooms)
router.use('/events', events)
router.use('/locations', locations)
router.use('/stripe', stripe)
router.use('/booking', booking)
router.use('/users',users)
router.use('/favorites', favorites)
router.use('/reviews', reviews)
router.use('/books', books)

module.exports = router;
