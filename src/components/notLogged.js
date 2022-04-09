import React from 'react'
import { Link } from 'react-router-dom'

const NotLogged = () => {
    return(
        <div>
            <h1 className="mt-3 ms-3">You are not logged in</h1>
            <Link to="/login" className="mt-3 ms-3">Return to login...</Link>
        </div>
    )
}

export default NotLogged