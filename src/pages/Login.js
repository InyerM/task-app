import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import '../styles/login.css'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = React.useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const [contentButton, setContentButton] = useState('')
    const [dialogTitle, setDialogTitle] = useState('')

    let dialogRoute = ''

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        if (e.target.id === 'username') setUsername(e.target.value)
        if (e.target.id === 'password') setPassword(e.target.value)
    }

    const dialogContentButton = () => {
        if(dialogRoute === '/home'){
            setContentButton(<Link to={dialogRoute} style={{textDecoration: "none"}}>Accept</Link>)
        }
        else{
            setContentButton(<p>Accept</p>)
        }
    }

    const checkCredentials = async () => {
        const response = await fetch("http://localhost:4111/auth/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": `{\"username\":\"${username}\",\"password\":\"${password}\"}`
        })
        const responseJson = await response.json()

        return responseJson
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const res = await checkCredentials()

        if(res.message === 'Succesfully authenticated'){
            setDialogContent('You have entered the correct credentials')
            dialogRoute = '/home'

            const userInfo = {
                'username' : res.filtered[0].username,
                'id' : res.filtered[0]._id
            }

            window.localStorage.setItem('loggeduserinformation', JSON.stringify(userInfo))
        }
        else if(res.message === 'Authentication failed'){
            setDialogContent('You have entered wrong credentials')
            dialogRoute = ''
        }

        setDialogTitle(res.message)
        dialogContentButton()
        handleClickOpen()
    }

    return (
        <div className="login-page">
            <section className="login-section">
                <header>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" required onChange={handleChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" required onChange={handleChange}></input>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button type="submit" className="btn btn-primary button">Login</button>
                        </div>
                    </form>
                </main>
            </section>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        {
                            contentButton
                        }
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Login