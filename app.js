//The starting  point of the application

'use strict'

require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const { join } = require('path')
const mongoose = require('./configs/mongoose')
const app = express()

//Connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

//View engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/shoppingCartsRouter'))
app.use('*', (req, res, next) => next(createError(404)))

//Error handler
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.status === 404) {
    return res
      .status(404)
      .sendFile(join(__dirname, 'views', 'errors', '404.html'))
  }
})
//Start listening on port 3003
app.listen(3003, () => {
  console.log('Server started on http://localhost:3003')
  console.log('Press Ctrl-C to terminate...')
})