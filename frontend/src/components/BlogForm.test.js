import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blogObject = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://test.com/'
  }

  test(
    'form calls the event handler it received as props with the right details when a new blog is created',
    async () => {

      const createBlog = jest.fn()
      const user = userEvent.setup()

      const { container } = render(<BlogForm createBlog={createBlog} />)

      const titleInput = container.querySelector('#title-input')
      const authorInput = container.querySelector('#author-input')
      const urlInput = container.querySelector('#url-input')
      const sendButton = screen.getByText('create')

      await user.type(titleInput, 'Test Title')
      await user.type(authorInput, 'Test Author')
      await user.type(urlInput, 'https://test.com/')
      await user.click(sendButton)

      expect(createBlog.mock.calls[0][0]).toEqual(blogObject)
    }
  )
})