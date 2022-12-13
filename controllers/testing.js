const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

testingRouter.post('/reset', async (request, response) => {
  console.log('api hit')
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter