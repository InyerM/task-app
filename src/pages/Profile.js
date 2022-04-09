import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PForm from '../components/ProfileForm'
import NotLogged from '../components/notLogged'
import '../styles/profile.css'

const Profile = () => {

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
                <main className="profile-page">
                    <section className="profile-section">
                        <PForm user={userData} title='Edit profile information' type='edit'/>
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

export default Profile