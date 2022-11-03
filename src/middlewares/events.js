const {Router} = require('express')
const {createEvent, getEvent, getEventById, updateEvent, deleteEvent,getHotelEventsById} = require('../controllers/events')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
          return res.json(await getEvent()) 
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getEventById(id))
    } catch (error) {
        next(error)
    }
})

router.get('/hotel/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getHotelEventsById(id))
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await createEvent(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateEvent(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteEvent(id))
    } catch (error) {
        next(error)
    }
})


module.exports = router