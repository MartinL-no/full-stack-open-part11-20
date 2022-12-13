import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, username }) => {
  const [detailsAreShown, setDetailAreShown] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggleDetails = () => {
    setDetailAreShown(!detailsAreShown)
  }

  const handleAddLike = () => {
    addLike(blog)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  const details = () => (
    <>
      <p>{blog.url}</p>
      <p>{`${blog.likes} `}<button onClick={handleAddLike}>like</button></p>
      <p>{blog.user.name}</p>
      {username === blog.user.username && <button onClick={handleRemoveBlog}>remove</button>}
    </>
  )

  return (
    <div className='blog' style={blogStyle}>
      <span>{blog.title} </span>
      <span>{blog.author} </span>
      <button onClick={handleToggleDetails}>view</button>
      {detailsAreShown && details()}
    </div>
  )
}

export default Blog