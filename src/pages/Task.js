import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TaskTable from '../components/TaskTable'
import NotLogged from '../components/notLogged'
import '../styles/profile.css'

const Task = () => {

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
                <main className="task-page">
                    <section className="task-section">
                        <TaskTable user={userData}/>
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

export default Task