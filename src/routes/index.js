require('dotenv').config();
const { Router } = require('express');
const router = Router();
const roomRoutes = require('../middlewares/roomRoutes')
const hotelRoutes = require('../middlewares/hotelRoutes')

 router.use('/filtersHotels', filtersHRoutes)
 router.use('/filtersRooms', filtersRRoutes)

router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)

module.exports = router;
