import { createFactory } from "react"

describe('Blogs app', function () {

  const user = {
    name: 'Tyhäm Tester',
    username: 'dummy',
    password: 'salasana'
  }

  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: user
  }

  const createBlog = () => {
    const { title, author, url } = blog
    cy.get('#new-blog-button').click()
    cy.get('#title-input').type(title)
    cy.get('#author-input').type(author)
    cy.get('#url-input').type(url)
    cy.get('#add-blog-button').click()
  }

  beforeEach(function () {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('No blogs to display!' || 'Blogs')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.get('#login-form')
  })

  it('blogs are in descending order by likes from top to bottom', function () {
    cy.request('POST', 'http://localhost:3001/api/testing/blogs/insertmany')
    cy.reload()

    cy.contains('View').click()
    cy.contains('View').click()
    cy.contains('View').click()
    cy.contains('View').click()
    cy.contains('View').click()
    cy.contains('View').click()

    function isDescending(arr) {
      return arr.every(function (x, i) {
        return i === 0 || x <= arr[i - 1];
      });
    }

    cy.get('likes').then(likes => {
      cy.expect(isDescending(Array.from(likes))).to.be.true
    })

  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      const { username, password, name } = user
      cy.get('#username-input').type(username)
      cy.get('#password-input').type(password)
      cy.get('#login-button').click()

      cy.contains(`Logged in as ${name}`)
    })

    it('user is informed when providing an invalid password', function () {
      const { username, password, name } = user
      cy.get('#username-input').type(username)
      cy.get('#password-input').type('väärin')
      cy.get('#login-button').click()
      cy.get('.toast-error')
      cy.contains(`Invalid password.`)
    })

  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login(user)
    })

    it('A blog can be created', function () {
      const { title, author, url } = blog

      cy.get('#new-blog-button').click()
      cy.get('#title-input').type(title)
      cy.get('#author-input').type(author)
      cy.get('#url-input').type(url)
      cy.get('#add-blog-button').click()

      cy.contains(title)
      cy.contains(author)

    })

    describe('after blog creation', function () {

      beforeEach(function () {
        createBlog();
      })

      it('A blog can be maximized', function () {
        cy.contains('View').click()
        cy.contains(blog.url)
        cy.contains('Likes:')
        cy.contains('Hide')
        cy.contains('Remove')
      })

      it('A blog can be liked', function () {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Liked')
        cy.get('.toast-success')
      })

      it('A blog can be removed', function () {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.contains('Removed')
        cy.get('.toast-success')
      })

    })



  })

})