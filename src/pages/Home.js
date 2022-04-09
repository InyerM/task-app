import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../styles/home.css'
import imgHome from '../images/home.png'
import NotLogged from '../components/notLogged'

const Home = () => {

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
                <main className="home-page">
                    <section className="left-column">
                        <article>
                            <h1>Task Manager</h1><br></br><br></br>
                            <p>Welcome to my task manager made in React
                            </p>
                        </article>
                    </section>
                    <section className="right-column">
                        <img src={imgHome}/>
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

export default Home