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
      return { id: insertedId }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/',
    schema: fastify.getSchema('schema:todo:list:query'),
    handler: async function listTodos (request, reply) {
      const { skip, limit, title } = request.query
      const todos = await this.mongoDataSource.listTodos({
        filter: { title },
        skip,
        limit
      })
      const totalCount = await this.mongoDataSource.countTodos()
      return { data: todos, totalCount }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: fastify.getSchema('schema:todo:read:params'),
      response: {
        200: fastify.getSchema('schema:todo')
      }
    },
    handler: async function readTodo (request, reply) {
      const todo = await this.mongoDataSource.readTodo(request.params.id)
      if (!todo) {
        reply.code(404)
        return { error: 'Todo not found' }
      }
      return todo
    }
  })
}
