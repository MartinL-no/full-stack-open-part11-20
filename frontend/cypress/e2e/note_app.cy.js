describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a blog can be created', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title-input').type('a note created by cypress')
      cy.get('#author-input').type('test author')
      cy.get('#url-input').type('www.test.com')
      cy.get('#create-blog-button').click()
      cy.get('.blogs').contains('a note created by cypress')
    })

    describe('and blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'www.first-blog.com' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'www.second-blog.com' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'www.third-blog.com' })
      })

      it('a blog can be liked', function() {
        cy.contains('first blog').parent().find('button').click()
        cy.contains('like').click()
        cy.contains('first blog').parent().contains('1')
      })

      it('a blog can be deleted', function() {
        cy.contains('first blog').parent().find('button').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'first blog')
      })

      it.only('the blogs are sorted by most likes', function() {
        cy.contains('third blog').parent().find('button').click()
        cy.contains('like').click()
        cy.contains('third blog').parent().contains('1')
        cy.contains('like').click()
        cy.contains('third blog').parent().contains('2')
        cy.contains('third blog').parent().find('button:first').click()

        cy.contains('second blog').parent().find('button').click()
        cy.contains('like').click()
        cy.contains('second blog').parent().contains('1')
        cy.contains('second blog').parent().find('button:first').click()

        cy.get('.blog').eq(0).should('contain', 'third blog')
        cy.get('.blog').eq(1).should('contain', 'second blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })
    })
  })
})