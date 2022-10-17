const {Router} = require('express')
const {Room} = require('../db')
const {getAllHotels, getHotelByName, getHotelById ,createHotel, updateHotel, deleteHotel} = require('../controllers/hotel.js')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
        if(name){
            let result = await getHotelByName(name)
            if(typeof result !== 'object'){
                return res.status(404).send(result)
            }else{
                return res.json(result)
            }
        }else{
            return res.json(await getAllHotels())
        }
    } catch (error) {
        console.log(error)
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