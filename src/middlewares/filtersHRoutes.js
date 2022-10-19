const { Router } = require('express');
const router = Router();
const { Hotel, Location, ServicesHotel, Event } = require('../db')

//// FILTRADO HOTEL POR LOCATION ////
router.get('/location', async (req, res, next) => {
    const { filter} = req.query

    try {
      const hotels = await Hotel.findAll({ include: {
        model: Location,
        attributes: ['city', 'state','department'],
        through: {
            attributes: []
        }
    }
    })      
        const filterLocation = hotels?.filter(e => e.Locations?.find(e => (e.city) === filter || (e.department) === filter || (e.state) === filter))
        filterLocation? res.json(filterLocation) : res.send('no hotels were found with that location')       
        
    } catch (error) {
      next(error) 
    }
})


//// FILTRADO HOTEL POR SERVICES ////
router.get('/services', async (req, res, next) => {
    const { id, filter} = req.query
    
    try {
        const hotels = await Hotel.findAll({where: {id:id}},{include: {
          model: ServicesHotel,
          attributes: ['name', 'description','image'],
          through: {
              attributes: []
          }
      }  
    })
        const filterServices = hotels?.filter(e => e.ServicesHotels?.find(e => (e.name) === filter))
        filterServices? res.json(filterServices) : res.send('no hotels were found with that services')
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO HOTEL POR EVENT ////
router.get('/event', async (req, res, next) => {
    const { filter} = req.query
    
    try {
        const hotels = await Hotel.findAll({ include: {
          model: Event,
          attributes: ['name', 'description','image', 'date', 'price'],
          through: {
              attributes: []
          }
      }   
    })
        const filterEvent = hotels?.filter(e => e.Events.find(e => e.name === filter))
        filterEvent? res.json(filterEvent) : res.send('no hotels were found for this event')
    } catch (error) {
      next(error) 
    }
})


module.exports = router;
