const {Router} = require('express')
const {getFavoritesByUserId,addFavorites, deleteFavorites} = require('../controllers/favorites')

const router = Router()

// router.get('', async (req, res, next)=>{
//     try {
//           return res.json(await getFavorites()) 
//     } catch (error) {
//         next(error)
//     }
// })

router.post('', async (req, res, next)=>{
    
    try {
        return res.json( await addFavorites(req.body))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getFavoritesByUserId(id))
    } catch (error) {
        next(error)
    }
})

// router.put('/', async(req,res,next)=>{
//     try {
//         res.json( await updateUser(req.body))
//     } catch (error) {
//         next(error)
//     } 
// })

router.delete('', async(req,res,next) =>{
    try {
        return res.send(await deleteFavorites(req.body))
    } catch (error) {
        next(error)
    }
})

module.exports = router