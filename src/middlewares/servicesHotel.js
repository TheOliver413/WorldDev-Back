const {Router} = require('express')
const {Room} = require('../db')
const {createServiceH, getServiceHname, getServiceById, getHotelServiceById,updateServiceH, deleteServiceH} = require('../controllers/servicesHotel')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
          return res.json(await getServiceHname()) 
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getServiceById(id))
    } catch (error) {
        next(error)
    }
})
router.get('/hotel/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getHotelServiceById(id))
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await createServiceH(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateServiceH(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteServiceH(id))
    } catch (error) {
        next(error)
    }
})


module.exports = router