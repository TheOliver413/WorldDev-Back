require('dotenv').config();
const { Router } = require('express');
const router = Router();
const roomRoutes = require('../middlewares/roomRoutes')
const hotelRoutes = require('../middlewares/hotelRoutes')
const filtersHRoutes = require('../middlewares/filtersHRoutes')
const filtersRRoutes = require('../middlewares/filtersRRoutes')

router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)
router.use('/filtersHotels', filtersHRoutes)
router.use('/filtersRooms', filtersRRoutes)

module.exports = router;
