/**
 * 加载mongodb
 */
const mongoose = require('mongoose')
const path = require('path')
const autoIncrement = require('mongoose-auto-increment')

const config = require('../config')

const connection = mongoose.connect(config.database.mongodb.db, (err) => {
  if(err) {
    console.log('connect to error: ', config.database.mongodb.db, err.message)
    process.exit(1)
  }
})

autoIncrement.initialize(connection)

if (!config.env.isProduction()) {
  mongoose.set('debug', true)
}

[
  'User',
  'FilterWord',
  'Resource',
].map((modelName) => {
  exports[modelName] = require(path.join(__dirname, modelName))
})
