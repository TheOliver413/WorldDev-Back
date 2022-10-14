require('dotenv').config();
const { Router } = require('express');
const router = Router();
const roomRoutes = require('../middlewares/roomRoutes')
const hotelRoutes = require('../middlewares/hotelRoutes')
const servicesHotel = require('../middlewares/servicesHotel')
// router.use('/filtersH', filtersHRoutes)
// router.use('/filtersR', filtersRRoutes)

router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)
router.use('/serviceHotels', servicesHotel)

module.exports = router;
