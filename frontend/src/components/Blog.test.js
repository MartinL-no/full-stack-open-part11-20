import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 99,
    user: {
      name: 'Test'
    }
  }

  test(
    'renders the blog`s title and author, but does not url or number of likes by default',
    () => {
      const { container } = render(<Blog blog={blog} />)

      const div = container.querySelector('.blog')

      expect(div).toHaveTextContent('Test Blog')
      expect(div).toHaveTextContent('Test Author')
      expect(div).not.toHaveTextContent('https://test.com/')
      expect(div).not.toHaveTextContent(99)
    }
  )

  test('url and number of likes are shown when the button controlling the shown details has been clicked',
    async () => {
      const { container } = render(<Blog blog={blog} />)

      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const div = container.querySelector('.blog')

      expect(div).toHaveTextContent('https://test.com/')
      expect(div).toHaveTextContent('99')
    }
  )

  test('if the like button is clicked twice, the event handler the component received as props is called twice',
    async () => {
      const mockHandler = jest.fn()

      render(
        <Blog blog={blog} addLike={mockHandler} />
      )

      const user = userEvent.setup()
      const viewButton = screen.getByText('view')
      await user.click(viewButton)
      const likeButton = screen.getByText('like')
      await user.click(likeButton)
      await user.click(likeButton)

      expect(mockHandler.mock.calls).toHaveLength(2)
    }
  )
})