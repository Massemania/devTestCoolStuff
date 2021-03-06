
//Mongoose config

'use strict'

const mongoose = require('mongoose')

//Connection status
module.exports.connect = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected'))

  //If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination')
      process.exit(0)
    })
  })

  //Connect to the Atlas Mongo DB
  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}