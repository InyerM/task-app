import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Profile from '../components/Profile'
import NotLogged from '../components/notLogged'
import '../styles/profile.css'

const MyProfile = () => {
    const [username, setUsername] = useState('')
    let id = ''
    const [userData, setUserData] = useState([])

    const fetchUser = async () => {
        const res = await fetch(`http://localhost:4111/users/${id}`)
        const resJson = await res.json()
        setUserData(resJson)
    }

    useEffect(() => {
        const loggedInfo = window.localStorage.getItem('loggeduserinformation')
        if (loggedInfo != undefined) {
            const user = JSON.parse(loggedInfo)
            setUsername(user.username)
            id = user.id
        }
        fetchUser()
    }, [])

    if(username != ''){
        return (
            <div>
                <NavBar user={userData}/>
                <main className="profile-page d-flex justify-content-center" style={{margin: '7rem 0'}}>
                    <section className="profile-section">
                        <Profile
                        username={userData.username}
                        names={userData.names}
                        lastnames={userData.lastnames}
                        role={userData.role}
                        created_at={userData.created_at}/>
                    </section>
                </main>
                <Footer/>
            </div>
        )
    }

    return(
        <div>
            <NotLogged />
        </div>
    )
}

export default MyProfile