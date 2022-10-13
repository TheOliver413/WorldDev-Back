require('dotenv').config();
const { Router } = require('express');
const router = Router();
const roomRoutes = require('../middlewares/roomRoutes')
const hotelRoutes = require('../middlewares/hotelRoutes')
// router.use('/filtersH', filtersHRoutes)
// router.use('/filtersR', filtersRRoutes)

router.use('/rooms',roomRoutes)
router.use('/hotels', hotelRoutes)

module.exports = router;
