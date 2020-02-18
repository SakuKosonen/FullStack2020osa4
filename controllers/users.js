const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const blogs = await Blog.find({})
    

    const saltRounds = 10
    
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        blogs: blogs
    })

    if(body.password.length > 2) {

    const savedUser = await user.save()
    response.json(savedUser.toJSON())
    } else {
       
        const badUser = new User({
            username: body.username,
            name: body.name,
            passwordHash: '1',
        })
    
        const savedUser = await badUser.save()
        response.json(savedUser.toJSON())

    }
  /*  try {
        
        response.json(savedUser.toJSON())
    } catch (jotai){
        response.status(400).end()
    }*/


})

usersRouter.get('/', async (request, response) => {
    //const users = await User.find({})

    const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter