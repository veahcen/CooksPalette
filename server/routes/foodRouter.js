const Router = require('express')
const router = new Router()
const foodController = require('../controllers/foodController')




router.post('/', foodController.create) // создание
router.get('/', foodController.getAll) // получение
router.get('/:id', foodController.getOne) // получение конкретного объекта
router.delete('/:id', foodController.deleteOne)
router.put('/:id/rating', foodController.updateRating)





module.exports = router