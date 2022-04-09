import React, { useEffect, useState } from 'react'
import '../styles/task-table.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const TaskTable = ({user}) => {

    const [dataUsers, setDataUsers] = useState([])
    const [dataTasks, setDataTasks] = useState([])
    const [dialogInput, setDialogInput] = useState()
    const [taskUsername, setTaskUsername] = useState()
    const [taskDescription, setTaskDescription] = useState()
    const [taskState, setTaskState] = useState()
    let numid = 0

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const postTask = async (method, id) => {
        const options = {
            method: method,
            url: `http://localhost:4111/tasks${id}`,
            headers: {'Content-Type': 'application/json'},
            data: {description: taskDescription, state: taskState, username: taskUsername}
        };
        
        const res = await axios.request(options)
        return res
    }


    const handleAddTask = async (e) => {
        let method
        let found = false
        let id = ''
        if(dialogInput === 'addTask'){
            method = 'POST'
            found = true
        }
        else if(dialogInput === 'editTask'){
            const user = dataTasks.find(task => task.username === taskUsername)
            id = `/${user._id}`
            method = 'PUT'
            found = true
        }

        if(found) {
            const res = await postTask(method, id)
            alert(res.data.message)
        }
    }

    const addTask = () => {
        setDialogInput('addTask')
        handleClickOpen()
    }

    const editTask = () => {
        setDialogInput('editTask')
        handleClickOpen()
    }

    const addButtonTask = () => {
        if(user.role === 'admin'){
            return(
                <div className="buttons-add-edit">
                    <i className="fa-solid fa-circle-plus add" onClick={addTask}></i>
                    <i className="fa-solid fa-pen-to-square ms-2 edit" onClick={editTask}></i>
                </div>
            )
        }
    }

    const addDialog = () => {
        let placeholder1
        let placeholder2

        if(dialogInput === 'addTask'){
            placeholder1 = 'Enter an username that you want to asign'
            placeholder2 = 'Enter a description of the task'
        }
        else if(dialogInput === 'editTask'){
            placeholder1 = 'Enter an username to edit'
            placeholder2 = 'Enter a description of the task'
        }

        if(dialogInput === 'addTask' || dialogInput === 'editTask'){
            return(
                <form className="dialog">
                    <TextField
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    variant="standard"
                    label={placeholder1}
                    onChange={(e) => {
                        setTaskUsername(e.target.value)
                    }}
                    />
                    <TextField
                    margin="dense"
                    id="name"
                    type="email"
                    fullWidth
                    variant="standard"
                    label={placeholder2}
                    onChange={(e) => {
                        setTaskDescription(e.target.value)
                    }}
                    />
                    <label htmlFor="state" className="form-label mt-3">State of the task</label>
                    <select className="form-select" id="state" onChange={(e) => {
                        setTaskState(e.target.value)
                    }}>
                        <option selected disabled>Choose an option...</option>
                        <option>To do</option>
                        <option>In progress</option>
                        <option>Done</option>
                    </select>
                </form>
            )
        }
    }

    const fetchInfoUsers = async () => {
        const response = await fetch('http://localhost:4111/users')
        const responseJson = await response.json()
        setDataUsers(responseJson)
    }

    const fetchInfoTasks = async () => {
        const response = await fetch('http://localhost:4111/tasks')
        const responseJson = await response.json()
        setDataTasks(responseJson)
    }

    useEffect(() => {
        fetchInfoUsers()
        fetchInfoTasks()
    }, [])

    return (
        <div>
            <header className="table-header mb-2">
                {addButtonTask()}
            </header>
            <main className="table-view">
                <table>
                    <thead>
                        <tr className="theader">
                            <th className="t1">#</th>
                            <th className="t2">Names</th>
                            <th className="t3">Lastnames</th>
                            <th className="t4">Username</th>
                            <th className="t5">Description</th>
                            <th className="t6">Task state</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataUsers?.map((item) => {
                                const task = dataTasks?.find((i) => i.username === item.username)
                                numid++
                                if (task != null){
                                    return (
                                    <tr key={item._id}>
                                        <td>{numid}</td>
                                        <td>{item.names}</td>
                                        <td>{item.lastnames}</td>
                                        <td>{item.username}</td>
                                        <td>{task.description}</td>
                                        <td>{task.state} <i className="fa-solid fa-circle-check"></i></td>
                                    </tr>
                                    )}
                            })
                        }
                    </tbody>
                </table>
            </main>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add or edit task</DialogTitle>
                <DialogContent>
                <DialogContentText>
                </DialogContentText>
                {
                    addDialog()
                }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddTask}>Accept</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default TaskTable