const {Router} = require('express')
const {Location} = require('../db')
 const {getAllStates,addLocationToHotel,getAllDepartamentByState,getAllCitysByDepartment} = require('../controllers/locations')

const router = Router()
// 'city', 'state','department'
router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
        if(name){
            return res.json(await getAllDepartamentByState(name))
        }else{
            return res.json(await getAllStates()) 
        }    
    } catch (error) {
        next(error)
    }
})

router.get('/city', async (req, res, next)=>{
    const {name} = req.query
    try {
     return res.json(await getAllCitysByDepartment(name))
           
    }catch (error) {
        next(error)
    }
})
// router.get('/:id', async (req, res, next)=>{
//     const {id} = req.params
//     try {
//         return res.json(await getEventById(id))
//     } catch (error) {
//         next(error)
//     }
// })

// router.get('/hotel/:id', async (req, res, next)=>{
//     const {id} = req.params
//     try {
//         return res.json(await getHotelEventsById(id))
//     } catch (error) {
//         next(error)
//     }
// })

router.post('', async (req, res, next)=>{
    try {
        return res.json( await addLocationToHotel(req.body))
    } catch (error) {
        next(error)
    }
})

// router.put('/', async(req,res,next)=>{
//     try {
//         res.json( await updateEvent(req.body))
//     } catch (error) {
//         next(error)
//     } 
// })

// router.delete('/:id', async(req,res,next) =>{
//     const {id} = req.params
//     try {
//         return res.send(await deleteEvent(id))
//     } catch (error) {
//         next(error)
//     }
// })


module.exports = router