const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(await savedBlog.populate('user', { username: 1, name: 1 }))
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog === null) {
      return response.status(400).json({ error: 'the blog post does not exist' })
    } else if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'user does not have authority to delete this blog post' })
    } else if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    }

  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', userExtractor, async (request, response, next) => {
  const body = request.body
  const blogId = request.params.id
  const user = request.user

  const blog = {
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true })

    user.blogs = user.blogs.map(blog => {
      return blog.id === blogId
        ? { ...blog, likes: blog.likes }
        : blog
    })

    await user.save()
    response.status(200).json(await updatedBlog.populate('user', { username: 1, name: 1 }))
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter