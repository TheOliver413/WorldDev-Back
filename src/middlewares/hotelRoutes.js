const {Router} = require('express')
const {Room} = require('../db')
const {getAllHotels, getHotelByName, getHotelById ,createHotel, updateHotel, deleteHotel} = require('../controllers/hotel.js')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
        if(name){
           return res.json(await getHotelByName(name)) 
        }else{
            return res.json(await getAllHotels())
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getHotelById(id))
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await createHotel(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateHotel(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteHotel(id))
    } catch (error) {
        next(error)
    }
})




module.exports = router