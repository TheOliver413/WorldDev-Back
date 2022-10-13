const { Router } = require('express');
const router = Router();
const { Hotel } = require('../db.js')

//// FILTRADO HOTEL POR LOCATION ////
router.get('/location', async (req, res, next) => {
    const { filter, page, orderAlf, orderNum } = req.query

    try {
        const hotels = await Hotel.findAll({
            limit:8,
            offset: page,
            order: [["name", orderAlf]],
            order: [["qualification", orderNum]]
        })        
        const filterLocation = hotels?.filter(e => e.location.city === filter || e.location.country === filter || e.location.continent === filter) 
        filterLocation? res.json(filterLocation) : res.send('no hotels were found with that location')
        
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO HOTEL POR CATEGORY ////
// router.get('/category', async (req, res, next) => {
//     const { name,filter, page, orderAlf, orderNum } = req.query

//     try {
//         const hotels = await Hotel.findAll({
//             limit:8,
//             offset: page,
//             order: [["name", orderAlf]],
//             order: [["qualification", orderNum]]
//         })        
//         const filterCategory = hotels?.filter(e => e.category.name === filter) 
//         filterCategory? res.json(filterCategory) : res.send('no hotels were found with that category')
        
//     } catch (error) {
//       next(error) 
//     }
// })

//// FILTRADO HOTEL POR SERVICES ////
router.get('/services', async (req, res, next) => {
    const { filter, page, orderAlf, orderNum } = req.query
    
    try {
        const hotels = await Hotel.findAll({
          limit:8,
          offset: page,
          order: [["name", orderAlf]],
          order: [["qualification", orderNum]]
        })
        const filterServices = hotels?.filter(e => e.services.find(e => e.name === filter))
        filterServices? res.json(filterServices) : res.send('no hotels were found with that services')
    } catch (error) {
      next(error) 
    }
})

//// FILTRADO HOTEL POR EVENT ////
router.get('/event', async (req, res, next) => {
    const { filter, page, orderAlf, orderNum  } = req.query
    
    try {
        const hotels = await Hotel.findAll({
          limit:8,
          offset: page,
          order: [["name", orderAlf]],
          order: [["qualification", orderNum]]
      })
        const filterEvent = hotels?.filter(e => e.event.find(e => e.name === filter))
        filterEvent? res.json(filterEvent) : res.send('no hotels were found for this event')
    } catch (error) {
      next(error) 
    }
})


module.exports = router;
