const {Router} = require('express')
const router = Router()
const { Room } = require('../db.js')

//// FILTRADO ROOM POR SERVICES ////
router.get('/services', async (req, res, next) => {
    const { id, filter } = req.query
    
    try {
        const rooms = await Room.findAll({where:{id: id}},{ include: {
          model: ServiceRoom,
          attributes: ['name','image'],
          through: {
              attributes: []
          }
      }  
    })
        const filterServices = rooms?.filter(e => e.ServicesRooms?.find(e => (e.name) === filter))
        filterServices? res.json(filterServices) : res.send('no rooms were found with that services')
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO ROOM POR AVAILABLE ////
router.get('/available', async (req, res, next) => {
    const { id, filter } = req.query
    
    try {
      const rooms = await Room.findAll({where:{id: id}},{ include: {
        model: ServiceRoom,
        attributes: ['name','image'],
        through: {
            attributes: []
        }
    } 
  })
      const filterAvailable = rooms?.filter(e => e.available === filter)
      filterAvailable? res.json(filterAvailable) : res.send('no available rooms found')
    } catch (error) {
      next(error) 
    }
})

module.exports = router