import React from 'react'

const Profile = ({username, names, lastnames, role, created_at}) => {
    return(
        <div className="card" style={{width: '30rem'}}>
            <div className="card-body">
                <h2 className="card-title">{username}</h2>
                <h5 className="card-text">{names}<br></br>{lastnames}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Role: {role}</li>
                <li className="list-group-item">Created at: {created_at?.substr(0, 10)}</li>
            </ul>
        </div>
    )
}

export default Profile