const {Router} = require('express')
const{db} = require('../firebase')
const {getFirebaseInfo,getUserById,updateUser,deleteUser} = require('../controllers/users')

const router = Router()

router.get('', async (req, res, next)=>{
    try {
          return res.json(await getFirebaseInfo()) 
    } catch (error) {
        next(error)
    }
})

// router.post('', async (req, res, next)=>{
    
//     try {
//         return res.json( await createUser(req.body))
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getUserById(id))
    } catch (error) {
        next(error)
    }
})

router.put('/', async(req,res,next)=>{
    try {
        res.json( await updateUser(req.body))
    } catch (error) {
        next(error)
    } 
})

router.delete('/:id', async(req,res,next) =>{
    const {id} = req.params
    try {
        return res.send(await deleteUser(id))
    } catch (error) {
        next(error)
    }
})

module.exports = router