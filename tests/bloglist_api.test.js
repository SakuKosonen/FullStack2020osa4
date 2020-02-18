const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)

})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Pietari",
        author: "Tiaii",
        url: "vauva.fi/suomi24",
        likes: 420
    }


    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)



    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'Pietari'
    )


})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: "jonne",
        likes: 1000
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd.length)
    console.log(helper.initialBlogs.length)
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)


})

test('blog without likes has 0 likes', async () => {
    const newBlog = {
        author: "jonne",
        title: "esa päivässä pitää melan pystyssä",
        url: "ylilauta.fi/jonneilu124123"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const response = await api.get('/api/blogs')

    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})

/*test('id is id', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body.toEqual)
}) */

/* test('the first blog is about HTTP methods', async () => {
   const response = await api.get('/api/blogs')
 
   expect(response.body[0].title).toBe('HTML is easy')
 })*/

afterAll(() => {
    mongoose.connection.close()
})