import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios';
import '../styles/profile.css'

const ProfileForm = ({user, title, type}) => {

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[names, setNames] = useState('')
    const[lastnames, setLastnames] = useState('')
    const[role, setRole] = useState('')
    const[image, setImage] = useState()
    const[dataImages, setDataImages] = useState([])
    let dataImage = {}
    
    const [open, setOpen] = React.useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const [contentButton, setContentButton] = useState('')
    const [dialogTitle, setDialogTitle] = useState('')


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const roleSelect = () => {
        if(type==='add'){
            return (
                <div className="mb-3 col-md-6 col-sm-12">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-select" aria-label="Default select example" id="role" required defaultValue="Select user role" onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">Default user</option>
                    </select>
                </div>
            )
        }
    }

    const uploadImage = async () => {
        const formData = new FormData();

        formData.append("file", image);
        formData.append('username', username);
        
        const res = await axios.post("http://localhost:4111/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
        }})

        dataImage = res.data.image
        return res.data.message
    }

    const uploadUser = async () => {
        const options = {
            method: 'POST',
            url: 'http://localhost:4111/users',
            headers: {'Content-Type': 'application/json'},
            data: {
                username: username,
                password: password,
                img_url: `/public/${dataImage.path}`,
                names: names,
                lastnames: lastnames,
                role: role
            }
        };
        
        const res = await axios.request(options)

        return res.data.message
    }

    const updateImage = async (id) => {
        const formData = new FormData(); 

        formData.append("file", image);
        formData.append('text', user.username);
        
        const res = await axios.put(`http://localhost:4111/uploads${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
        }})

        dataImage = res.data.image
        return res.data.message
    }

    const updateUser = async () => {
        const options = {
            method: 'PUT',
            url: `http://localhost:4111/users/${user._id}`,
            headers: {'Content-Type': 'application/json'},
            data: {
                username: username,
                password: password,
                img_url: `/public/${dataImage?.path}`,
                names: names,
                lastnames: lastnames,
                role: role
            }
        };
        
        const res = await axios.request(options)

        return res.data.message
    }

    const alterUser = async () => {
        const userImage = dataImages.find(image => image.username === user.username)
        const id = `/${userImage?._id}`
        const resImage = await updateImage(id)
        const resUser = await updateUser()

        if(resImage === 'Image updated successfully' && resUser === 'User updated'){
            setDialogTitle('User succesfully updated')
            setDialogContent('Provided user was successfully updated')
            setContentButton(<Link to='/home' style={{textDecoration: "none"}}>Accept</Link>)
        }
        else{
            setDialogTitle('There was an error updating')
            setDialogContent('Looks like your updating have failed. Please try again')
            setContentButton(<p>Accept</p>)
        }
        handleClickOpen()
    }

    const createNewUser = async() => {
        const resImage = await uploadImage()
        const resUser = await uploadUser()

        if(resImage === 'Image uploaded successfully' && resUser === 'User saved'){
            setDialogTitle('User succesfully registered')
            setDialogContent('Provided user was successfully registered')
            setContentButton(<Link to='/home' style={{textDecoration: "none"}}>Accept</Link>)
        }
        else{
            setDialogTitle('There was an error registering')
            setDialogContent('Looks like your registration have failed. Please try again')
            setContentButton(<p>Accept</p>)
        }
        handleClickOpen()
    }

    const handleChange = (e) => {
        if(e.target.id === 'username') setUsername(e.target.value)
        if(e.target.id === 'password') setPassword(e.target.value)
        if(e.target.id === 'names') setNames(e.target.value)
        if(e.target.id === 'lastnames') setLastnames(e.target.value)
        if(e.target.id === 'role') setRole(e.target.value)
        if(e.target.id === 'formFile') {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        type === 'add' ? createNewUser() : alterUser()
    }

    const fecthImages = async () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:4111/uploads',
            headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
        };
        
        const res = await axios.request(options)
        setDataImages(res.data)
    }

    useEffect(() => {
        if(type === 'edit'){
            setUsername(user.username)
            setPassword(user.password)
            setNames(user.names)
            setLastnames(user.lastnames)
            setRole(user.role)
        }
        fecthImages()
    },[])

    return (
        <div>
            <h1>
                {title}
            </h1><br></br><br></br>
            <form className="profile-form row" onSubmit={handleSubmit}>
                <div className="mb-3 col-md-7 col-sm-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" id="username" aria-describedby="inputGroupPrepend" required placeholder="Enter your username" onChange={handleChange} value={username}></input>
                    </div>
                </div>
                <div className="mb-3 col-md-5 col-sm-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required onChange={handleChange} value={password}></input>
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                    <label htmlFor="names" className="form-label">Names</label>
                    <input type="text" className="form-control" id="names" placeholder="Enter your names" required onChange={handleChange} value={names}></input>
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                    <label htmlFor="lastnames" className="form-label">Lastnames</label>
                    <input type="text" className="form-control" id="lastnames" placeholder="Enter your lastnames" required onChange={handleChange} value={lastnames}></input>
                </div>
                {
                    roleSelect()
                }
                <div className="mb-3 col">
                    <label htmlFor="formFile" className="form-label">Profile picture</label>
                    <input className="form-control" type="file" id="formFile" required onChange={handleChange}></input>
                </div>
                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Accept</button>
                    <button type="button" className="btn btn-primary ms-3">Cancel</button>
                </div>
            </form>
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
    )
}

export default ProfileForm