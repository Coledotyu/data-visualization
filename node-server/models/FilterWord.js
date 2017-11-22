const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const config = require('../config/config')

const FilterWordSchema = new mongoose.Schema({
  word: { type: 'String', required: true, unique: true },
}, config.mongoose.schemaConfig)

FilterWordSchema.plugin(timestamps)
FilterWordSchema.plugin(uniqueValidator)

mongoose.model('FilterWord', FilterWordSchema)

module.exports = mongoose.model('FilterWord')
