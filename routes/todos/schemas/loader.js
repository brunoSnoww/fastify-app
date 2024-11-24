'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(require('./create-body.json'))
  fastify.addSchema(require('./create-response.json'))
  fastify.addSchema(require('./list-query.json'))
  fastify.addSchema(require('./todo.json'))
  fastify.addSchema(require('./get-todo.json'))
  fastify.addSchema(require('./update-todo.json'))
  fastify.addSchema(require('./status-param.json'))
})
