const {Router} = require('express')
const {Room} = require('../db')
const {getAllRooms, getRoomsByName, getRoomById ,createRoom, updateRoom, deleteRoom} = require('../controllers/room')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
        if(name){
           return res.json(await getRoomsByName(name)) 
        }else{
            return res.json(await getAllRooms())
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getRoomById(id))
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await createRoom(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateRoom(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteRoom(id))
    } catch (error) {
        next(error)
    }
})




module.exports = router