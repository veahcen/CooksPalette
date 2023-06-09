const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/chekRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create) // создание типа
router.get('/', typeController.getAll) // получение типа
router.delete('/', checkRole('ADMIN'), typeController.delete)

module.exports = router;