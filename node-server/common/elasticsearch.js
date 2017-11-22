const config = require('../config').database.elasticsearch
const elasticsearch = require('elasticsearch')
const esClient = new elasticsearch.Client(config)

module.exports = esClient
