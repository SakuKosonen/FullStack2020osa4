import React from 'react'

const CreateForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h2>Create New</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    title
          <input        
                        id="title"    
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
          <input
                        id="author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                    />

                </div>
                <button id='create-button' type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateForm