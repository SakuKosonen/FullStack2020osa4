import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [id, setId] = useState()


  async function renderBlogs() {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    
    renderBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeHandler124 = async(blog) => {
        
    const id = blog.id
    console.log(id)
    const newLikes = blog.likes + 1
    const newBlog =  {
        ...blog,
        likes: newLikes            
    }

    await blogService.update(
        id, newBlog,
      )
    console.log("moi")
    //setLikes(newLikes)
    
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(blogs)

    }

    const likeHandler = async (blog) => {
      const newLikes = blog.likes + 1
      
      const updated = {
        ...blog,
        likes: newLikes,       
      }
      await blogService.update(blog.id, updated)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    const removeHandler = async (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      }
    }


  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(event)
    console.log('näätä testi')
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)      
      console.log("toksu tehty")
      setUsername('')
      setPassword('')
    } catch (exception) {
      setId(1)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreate = async => {

    createFormRef.current.toggleVisibility()
    const newBlog =
    {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    try {
      blogService.create(newBlog)
      setId(2)
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {

      setId(1)
      setErrorMessage(`fill in required forms pls`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /* const loginForm = () => (
 
     <form onSubmit={handleLogin}>
       <h1>Log in to Application</h1>
       <div>
         username
           <input
           type="text"
           value={username}
           name="Username"
           onChange={({ target }) => setUsername(target.value)}
         />
       </div>
       <div>
         password
           <input
           type="password"
           value={password}
           name="Password"
           onChange={({ target }) => setPassword(target.value)}
         />
       </div>
       <button type="submit">login</button>
     </form>
   )
 
   const blogForm = () => (
     <div>
       <h2>blogs</h2>
       {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
       )}
     </div>
   ) */




   const createFormRef = React.createRef()


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} id={id} />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        /> :
        <div>
          <p>  {user.username} logged in<button onClick={() => logout()}>logout</button>  </p>
          <Togglable id='newBlog' buttonLabel='create new blog' ref={createFormRef}>
         
            <CreateForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleSubmit={handleCreate}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeHandler={likeHandler} removeHandler={removeHandler} user ={user} />
          )}
        </div>
      }

    </div>

  )
}



export default App