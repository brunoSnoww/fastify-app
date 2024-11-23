'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(require('./create-body.json'))
  fastify.addSchema(require('./create-response.json'))
  fastify.addSchema(require('./list-query.json'))
})
