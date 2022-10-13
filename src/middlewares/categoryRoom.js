const {Router} = require('express')
const {Room} = require('../db')
const {getCategoryRoomByName, getCategoryRoomById} = require('../controllers/room')

const router = Router()

router.get('/category', async(req,res,next) =>{
    const {name} = req.query
    try {
        if(name){
           return res.json(await getCategoryRoomByName(name)) 
        }else{
            return res.send(await Room.findAll({attributes: ["category"]}))
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router