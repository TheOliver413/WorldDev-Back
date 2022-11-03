const {Router} = require('express')
const {getFavoritesByUserId,addFavorites, deleteFavorites, getFavoritesIdsByUserId} = require('../controllers/favorites')

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
router.get('/list/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getFavoritesIdsByUserId(id))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    try {
        return res.json(await getFavoritesByUserId(id))
    } catch (error) {
        return res.status(404).send(error)
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