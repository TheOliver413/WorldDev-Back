require('dotenv').config();
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

router.use('/filtersHotels', filtersHRoutes)
router.use('/filtersRooms', filtersRRoutes)
router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)
router.use('/serviceHotels', servicesHotel)
router.use('/serviceRooms', servicesRooms)
router.use('/events', events)
router.use('/locations', locations)

module.exports = router;
