import React from 'react'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Task from '../pages/Task'
import Login from '../pages/Login'
import CProfile from '../pages/CProfile'
import MyProfile from '../pages/MyProfile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const App = () => (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/editProfile" element={<Profile />}/>
                <Route path="/tasks" element={<Task />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/createProfiles" element={<CProfile />}/>
                <Route path="/profile" element={<MyProfile />}/>
            </Routes>
        </BrowserRouter>
)

export default App