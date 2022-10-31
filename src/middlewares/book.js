const {Router} = require('express')
const { getBooks } = require('../controllers/book')
const router = Router()

router.get('/', async (req, res, next) => {
    
    try {
        res.json(await getBooks())
                
    } catch (error) {
      next(error)  
    }
  })

  module.exports = router