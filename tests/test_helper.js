const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    { 
        title: "Fäsäää",
        author: "Kenosilmä Kummi",
        url: "vauva.fi/suomi24",
        likes: 5
      
    },
    {
        title: "Javascript execution ceremony",
        author: "Browser",
        url: "wwwwwwwwwwwww",
        likes: 3
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: "will be",
    author: "removed",
    url: "soon",    
   })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
  }

