const {Router} = require('express')
const router = Router()
const { Hotel } = require('../db.js')

//// FILTRADO ROOM POR SERVICES ////
router.get('/services', async (req, res, next) => {
    const { name, filter, page, orderNum } = req.query
    
    try {
        const hotels = await Hotel.findAll({where:{name: name}},{
            limit:8,
            offset: page,
            order: [["price", orderNum]],
          })
          const filterServices = hotels?.map(e => e.rooms).filter(e => e.services.find(e => e.name === filter))
          filterServices? res.json(filterServices) : res.send('no rooms were found with that services')
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO ROOM POR AVAILABLE ////
router.get('/available', async (req, res, next) => {
    const { name, filter, page, orderNum } = req.query
    
    try {
        const hotels = await Hotel.findAll({where:{name: name}},{
            limit:8,
            offset: page,
            order: [["price", orderNum]],
          })
          const filterAvailable = hotels?.map(e => e.rooms).filter(e => e.available === filter)
          filterAvailable? res.json(filterAvailable) : res.send('no available rooms found')
    } catch (error) {
      next(error) 
    }
})

module.exports = router