//Controller for the shoppingcart
'use strict'

const ShoppingCart = require('../models/ShoppingCart')
const shoppingCartsController = {}

//Displays a list of items
shoppingCartsController.index = async (req, res, next) => {
  try {
    const viewData = {
      shoppingCarts: (await ShoppingCart.find({}))
        .map(shoppingCart => ({
          id: shoppingCart._id,
          name: shoppingCart.name,
          quantity: shoppingCart.quantity,
          category: shoppingCart.category,
        }))
    }
    res.render('./shoppingCarts/index', { viewData })
  } catch (error) {
    next(error)
  }
}

// Returns a HTML form for creating a new item
shoppingCartsController.new = async (req, res) => {
  const viewData = {
    name: '',
    quantity: '',
    category: '',
  }
  console.log('Viewdata: ', viewData)
  res.render('..', { viewData })
}

// Creates a new item
shoppingCartsController.create = async (req, res) => {
  try {
    const shoppingCart = new ShoppingCart({
      name: req.body.name,
      quantity: req.body.quantity,
      category: req.body.category,
    })
    await shoppingCart.save()
    console.log('The item was added to shopping cart')
    res.redirect('/')
  } catch (error) {
    console.log('Error adding item to shopping cart')
    res.redirect('./new')
  }
}

// Returns a HTML form for editing an item
shoppingCartsController.edit = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findOne({ _id: req.params.id })
    const viewData = {
      id: shoppingCart._id,
      name: shoppingCart.name,
      quantity: shoppingCart.quantity,
      category: shoppingCart.category,
    }
    res.render('shoppingCarts/edit', { viewData })
  } catch (error) {
    console.log('Could not find the item from shopping cart')
    res.redirect('..')
  }
}

//Updates a specific item
shoppingCartsController.update = async (req, res) => {
  try {
    const result = await ShoppingCart.updateOne({ _id: req.body.id }, {
      name: req.body.name,
      quantity: req.body.quantity,
      category: req.body.category,
    })
console.log('Id update: ', req.body.id)
    if (result.nModified === 1) {
      console.log('The item was successfully updated')
    } else {
      console.log('The item you attempted to update was removed by another user after you got the original values')
    }
    res.redirect('..')
  } catch (error) {
    console.log('Error updating item!')
    res.redirect('./edit')
  }
}

//Deletes a specific item
shoppingCartsController.delete = async (req, res) => {
  try {
    await ShoppingCart.findOneAndDelete({ _id: req.params.id })
    console.log(`The item ${req.params.id} was deleted!`)
    res.redirect('..')
  } catch (error) {
    console.log(error.message)
    res.redirect('..')
  }
}

//Exports
module.exports = shoppingCartsController