const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('most likes', () => {
  const blogArray = [
    {
      title:  'string reduction',
      author: ' Dijkstra',
      likes: 12
    },
    {
      title: 'Canonisdasdsadasdcal string reduction',
      author: 'Edssdasdsadsdsassssger W. Dijkstra',
      likes: 29
    },
    {
      title: 'Canonicawqwqwq  qwq wl string reduction',
      author: 'Edsgeqqqqqqqqqqqqqr Wq. Dijkstra',
      likes: 9
    }
  ]

  test('find blog with highest amount of likes, then return it', () => {
    const result = listHelper.favoriteBlog(blogArray)
    expect(result).toEqual({
      title: 'Canonisdasdsadasdcal string reduction',
      author: 'Edssdasdsadsdsassssger W. Dijkstra',
      likes: 29
    })
  })
})

describe('mostBlogs', () => {
  const authors = [
    {
      author: 'Martin',
      blogs: 12
    },
    {
      author: 'Jimbo',
      blogs: 299
    },
    {
      author: 'Dijkstra',
      blogs: 29
    }
  ]

  test('return name of author and amount of blogs for entry with the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(authors)
    expect(result).toEqual({
      author: 'Jimbo',
      blogs: 299
    })
  })
})

describe('mostLikes', () => {
  const blogs = [
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    },
    {
      author: 'Monty',
      likes: 29
    },
    {
      author: 'Jimbo',
      likes: 4
    }
  ]

  test('return name and amount of likes of authos with the most likes',() => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Monty',
      likes: 29
    })
  })
})