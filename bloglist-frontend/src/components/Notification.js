import React from 'react'

const Notification = ({ message, id }) => {
    if (message === null) {
        return null
    }

    if (id === 1) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    else {
        return (
            <div className="notError">
                {message}
            </div>
        )
    }
}

export default Notification