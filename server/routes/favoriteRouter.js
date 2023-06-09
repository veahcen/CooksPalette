const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const favoriteController = require('../controllers/favoriteController')

router.post('/', authMiddleware, favoriteController.addToFavorite )
router.get('/', authMiddleware, favoriteController.getFavoriteUser )
router.delete('/', authMiddleware, favoriteController.removeFromFavorite);
router.get('/check/:foodId', authMiddleware, favoriteController.isFoodInFavorites);


module.exports = router