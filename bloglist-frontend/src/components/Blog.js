
import Togglable from './Togglable'
import './components.css'
import React, { useState } from 'react'
import blogService from '../services/blogs'




const Blog = ({ blog, likeHandler, removeHandler, user }) => {
    const id = blog.id
    
  

    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }


    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='blog'>
            <div style={hideWhenVisible}>
                {blog.title} {" "}  {blog.author} {" "}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {blog.title} {" "}  {blog.author} {" "}
                <button onClick={toggleVisibility}>hide</button>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button className= 'saku' onClick={({target}) => likeHandler(blog)}>like</button></p>
                {user.username === blog.user.username && 
                <p><button onClick={({target}) => removeHandler(blog)}>remove</button></p>}

            </div>
        </div>
    )
}

export default Blog