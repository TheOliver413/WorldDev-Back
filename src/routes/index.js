require('dotenv').config();
const { Router } = require('express');
const router = Router();


router.use('/filtersH', filtersHRoutes)
router.use('/filtersR', filtersRRoutes)

module.exports = router;
