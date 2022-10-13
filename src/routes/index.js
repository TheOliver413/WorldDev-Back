require('dotenv').config();
const { Router } = require('express');
const router = Router();


 router.use('/filtersHotels', filtersHRoutes)
 router.use('/filtersRooms', filtersRRoutes)

module.exports = router;
