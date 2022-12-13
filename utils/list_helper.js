const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((total, blog) => blog.likes + total, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const result = blogs.sort((a, b) => a.likes - b.likes).slice(-1)[0]
  return result
}

const mostBlogs = (authors) => {
  const sorted = authors.sort((a, b) => a.blogs - b.blogs )
  return _.last(sorted)
}

const mostLikes = (blogs) => {
  const sorted = blogs.sort((a, b) => a.likes - b.likes)
  return _.last(sorted)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}