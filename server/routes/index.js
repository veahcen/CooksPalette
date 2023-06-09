const Router = require('express')
const router = new Router()
const foodRouter = require('./foodRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const favoriteRouter = require('./favoriteRouter')

router.use('/user', userRouter) // подроутеры, сопостовляем с маршрутами
router.use('/type', typeRouter)
router.use('/food', foodRouter)
router.use('/favorite', favoriteRouter)

module.exports = router