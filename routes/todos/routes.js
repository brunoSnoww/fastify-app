'use strict'

module.exports = async function todoRoutes (fastify, _opts) {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: fastify.getSchema('schema:todo:create:body'),
      response: {
        201: fastify.getSchema('schema:todo:create:response')
      }
    },
    handler: async function createTodo (request, reply) {
      const insertedId = await this.mongoDataSource.createTodo(request.body)
      reply.code(201)
      console.log(insertedId)
      return { id: insertedId }
    }
  })
}
