//ShoppingCarts routes

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/shoppingCartsController')

//Map HTTP verbs and route paths to controller actions
router.get('/', controller.index)
router.post('/create', controller.create)
router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.update)
router.post('/:id/delete', controller.delete)

//Exports
module.exports = router