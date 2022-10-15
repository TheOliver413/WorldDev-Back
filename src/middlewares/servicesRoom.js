const {Router} = require('express')
const {Room} = require('../db')
const {createServiceRoom, getServiceRoomByName, getServiceRoomById, updateServiceRoom, deleteServiceRoom} = require('../controllers/servicesHotel')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
          return res.json(await getServiceRoomByName(name)) 
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getServiceRoomById(id))
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await createServiceRoom(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateServiceRoom(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteServiceRoom(id))
    } catch (error) {
        next(error)
    }
})


module.exports = router