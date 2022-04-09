import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Link } from 'react-router-dom'

const NavBar = ({user}) => {

    const [open, setOpen] = React.useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const [dialogTitle, setDialogTitle] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLogout = (e) => {
        handleClickOpen()
        window.localStorage.removeItem('loggeduserinformation')
        setDialogContent('Succesfully logged out')
        setDialogTitle('Returning to login page')
    }

    return (
        <>
            <nav className="nav-home">
                <ul>
                    <li><Link to="/home" className="nav-item"><i className="fa-solid fa-house"></i></Link></li>
                    <li><Link to="/profile" className="nav-item"><i className="fa-solid fa-user"></i></Link></li>
                    <li><Link to="/editProfile" className="nav-item">Edit Profile</Link></li>
                    <li><Link to="/tasks" className="nav-item">Tasks</Link></li>
                    {
                        user.role === 'admin'
                        ? <li><Link to="/createProfiles" className="nav-item">Add profiles</Link></li>
                        : <li></li>
                    }
                    <li id="right">
                        <Button to="/" className="nav-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket" id="logout"></i>
                            Logout
                        </Button>
                    </li>
                </ul>
            </nav>
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
                        <Link to={"/login"} style={{textDecoration: "none"}}>Accept</Link>
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default NavBar