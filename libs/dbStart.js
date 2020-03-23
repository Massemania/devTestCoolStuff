/**
 * Connection to the database via mongoose
 */

'use strict'

// Require mongoose
let mongoose = require('mongoose')

// Export initialize function
module.exports = {
    /**
     * Anonymous function to initialize mongoose connection
     */
  initialize: function () {
    let db = mongoose.connection

        // logging if something goes wrong
    db.on('error', function () {
      console.log('Error connecting to database')
    })
            // connecting to database
    db.once('open', function () {
      console.log('Success - connected to database')
    })
    mongoose.connect('mongodb://mats:05990599@ds231549.mlab.com:31549/tradejournal')
  }
}
