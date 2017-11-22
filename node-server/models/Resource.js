const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const config = require('../config/config')

const ResourceSchema = new mongoose.Schema({
  url: { type: 'String', required: true, unique: true },
  fileType: { type: 'String', required: true },
  name: { type: 'String', required: true },
  size: { type: 'Number' }
}, config.mongoose.schemaConfig)

ResourceSchema.plugin(timestamps)
ResourceSchema.plugin(uniqueValidator)

mongoose.model('Resource', ResourceSchema)

module.exports = mongoose.model('Resource')
