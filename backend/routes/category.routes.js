const Router = require('express')
const router = new Router()
const categoryController = require('../controller/category.controller')

router.post('/category', categoryController.createCategory)
router.get('/category', categoryController.getCategories)
router.get('/category/:id', categoryController.getOneCategory)
router.put('/category', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)


module.exports = router