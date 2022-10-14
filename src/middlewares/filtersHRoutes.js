const { Router } = require('express');
const router = Router();
const { Hotel, Location, ServicesHotel, Event } = require('../db')

//// FILTRADO HOTEL POR LOCATION ////
router.get('/location', async (req, res, next) => {
    const { filter, page } = req.query

    try {
      const hotels = await Hotel.findAll({ include: {
        model: Location,
        attributes: ['city', 'country','continent'],
        through: {
            attributes: []
        }
    },
      limit: 8,
      offset: page,    
  
    })   
        console.log(hotels)     
        const filterLocation = hotels?.filter(e => e.Locations?.find(e => (e.city) === filter || (e.country) === filter || (e.continent) === filter))
        filterLocation? res.json(filterLocation) : res.send('no hotels were found with that location')       
        
    } catch (error) {
      next(error) 
    }
})


//// FILTRADO HOTEL POR SERVICES ////
router.get('/services', async (req, res, next) => {
    const { filter, page } = req.query
    
    try {
        const hotels = await Hotel.findAll({ include: {
          model: ServicesHotel,
          attributes: ['name', 'description','image'],
          through: {
              attributes: []
          }
      },
        limit: 8,
        offset: page,    
    
    })
        const filterServices = hotels?.filter(e => e.ServicesHotels?.find(e => (e.name) === filter))
        filterServices? res.json(filterServices) : res.send('no hotels were found with that services')
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO HOTEL POR EVENT ////
router.get('/event', async (req, res, next) => {
    const { filter, page } = req.query
    
    try {
        const hotels = await Hotel.findAll({ include: {
          model: Event,
          attributes: ['name', 'description','image', 'date', 'price'],
          through: {
              attributes: []
          }
      },
        limit: 8,
        offset: page,    
    
    })
        const filterEvent = hotels?.filter(e => e.Events.find(e => e.name === filter))
        filterEvent? res.json(filterEvent) : res.send('no hotels were found for this event')
    } catch (error) {
      next(error) 
    }
})


module.exports = router;
