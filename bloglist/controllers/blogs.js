const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogsRouter.get('/', async (request, response) => {
  //const blogs = await Blog.find({})

  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

/*blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()))
  })
})*/

blogsRouter.get('/:id', async (request, response) => {
 /* Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))*/


    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }


})



blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //const decodedToken = jwt.verify(token, process.env.SECRET)


  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //const user = await User.findById(body.userId)
  //const users = await User.find({})
  //const user = users[0]
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes || 0

  })

  /*try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch (e) {
    response.status(400).end()
  }*/

  

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())

  


})

blogsRouter.delete('/:id', async (request, response) => {

  const token = request.token

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  if (JSON.stringify(blog.user) === JSON.stringify(decodedToken.id)){
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  } else {
    response.status(401).send('Unauthorized')
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updated.toJSON())


 /* Blog.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))*/
})



module.exports = blogsRouter