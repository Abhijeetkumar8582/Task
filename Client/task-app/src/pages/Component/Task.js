import React, { useEffect, useState, useCallback } from 'react'
import Style from '@/styles/Task.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import { toggleSelected } from '../../Redux/Action/index.js'
// import { count } from '../Redux/Action/index.js'
import { useDispatch, useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TaskDescription from './TaskDescHOC.js'
import { useRouter } from 'next/router.js';

function Task() {
    const router = useRouter()
    const dispatch = useDispatch()
    const User_Access_Token = useSelector(state => state.accessToken);
    const [userName, setUserName] = useState('')

    const user_Selected = useSelector((state) => state.selectCheckBox.selectedDelete);

    // console.log(user_Selected)

    const [listArr, setListArr] = useState([])

    const Checkbox_ID_Selected = (taskName) => {
        dispatch(toggleSelected(taskName))
    }


    useEffect(() => {
        if (!sessionStorage.getItem('userLogin')) {
            router.push("/Component/Login")
        }
        setUserName(sessionStorage.getItem('userName'))
        rerender()
    }, [setListArr]);

    const rerender = () => {
        fetch(`https://task-tdbd.onrender.com/allTask`, {
            method: "GET",
            headers: {
                "Authorization": sessionStorage.getItem('userLogin')
            }
        })
            .then(response => response.json())
            .then(result => {
                setListArr(result)

            })
            .catch(error => console.log('error', error));
    }
    const deleteTask = () => {
        if (user_Selected.length === 1) {
            fetch('https://task-tdbd.onrender.com/deleteTask', {
                method: "delete",
                headers: {
                    "Authorization": sessionStorage.getItem('userLogin'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userId": sessionStorage.getItem('userLogin'),
                    "taskName": user_Selected[0]
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    rerender()
                    // setListArr((prevSelected) => [...prevSelected, data])
                })
                .catch((err) => console.log(err))
        }
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };
    const [taskName, setTaskName] = useState('')
    const [taskDesc, settaskDesc] = useState('')
    const [status, setStatus] = useState('');

    const handle_Status_Change = (event) => {
        setStatus(event.target.value);
    };
    const EditSelected = () => {
        if (user_Selected.length == 1) {
            for (let i = 0; i < listArr.length; i++) {
                if (listArr[i].taskName === user_Selected[0]) {
                    handleOpen()
                    setTaskName(listArr[i].taskName)
                    settaskDesc(listArr[i].taskDesc)
                    setStatus(listArr[i].status)
                    break;
                }
            }
        }
        else {
            handleOpenErrorMessage()
        }
    }
    const On_Edit_Save = () => {
        for (let i = 0; i < listArr.length; i++) {
            if (listArr[i].taskName === user_Selected[0]) {
                dispatch(toggleSelected(listArr[i].taskName))
                console.log(user_Selected, listArr[i].taskName)
                listArr[i].taskName = taskName
                listArr[i].description = taskDesc
                listArr[i].status = status
                
                fetch('https://task-tdbd.onrender.com/updateTask', {
                    method: "PUT",
                    headers: {
                        "Authorization": sessionStorage.getItem('userLogin'),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "taskName": user_Selected[0],
                        "updateTaskName": taskName,
                        "taskDesc": taskDesc,
                        "status": status
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setListArr(data)
                    })
                    .catch((err) => console.log(err))
                // dispatch(toggleSelected(taskName))
                console.log(user_Selected, taskName)
                handleClose()
                break;
            }
        }
    }

    const [openErrorMessage, setopenErrorMessage] = React.useState(false);
    const handleOpenErrorMessage = () => setopenErrorMessage(true);
    const handleCloseErrorMessage = () => setopenErrorMessage(false);
    const errorStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    }
    const taskNameChange = (e) => {
        setTaskName(e.target.value)
    }
    const taskDescChange = (e) => {
        settaskDesc(e.target.value)
    }

    const [CreateTaskName, setCreateTaskName] = useState('')
    const [CreateTaskDesc, setCreateTaskDesc] = useState('')
    const [openCreateTask, setOpenCreateTask] = React.useState(false);
    const CreateTaskOpen = () => setOpenCreateTask(true);
    const CreateTaskClose = () => setOpenCreateTask(false);

    const Create_taskName = (e) => {
        setCreateTaskName(e.target.value)
    }
    const Create_taskDesc = (e) => {
        setCreateTaskDesc(e.target.value)
    }
    const [createStatus, setCreateStatus] = useState('Work In Progess')
    const Create_Task_status = (event) => {
        setCreateStatus(event.target.value);
    };
    const on_create_task = () => {
        const id = listArr.length + 1
        const data = {
            id: id,
            taskName: CreateTaskName,
            taskDesc: CreateTaskDesc,
            status: createStatus,
            lastUpdated: new Date().toDateString(),
        }
        fetch('https://task-tdbd.onrender.com/createTask', {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem('userLogin'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => setListArr((prevSelected) => [...prevSelected, data]))
        CreateTaskClose()
        // setListArr((prevSelected) => [...prevSelected, data])
    }
    const on_delete_task = () => {
        fetch('https://task-tdbd.onrender.com/createTask', {
            method: "POST",
            headers: {
                "Authorization": sessionStorage.getItem('userLogin'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => setListArr((prevSelected) => [...prevSelected, data]))
    }
    const getStatusBoxClass = (status) => {
        if (status === "Testing") {
            return Style.status_Box_Testing
        } else if (status === "In Production") {
            return Style.status_Box_production
        } else {
            return Style.status_Box_Work_In_Progess
        }
    }

    const taskRow_selected = (task, i) => {

    }
    return (
        <div style={{ padding: '2rem', background: 'linen', height: '100vh' }} >

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Welcome back {userName.slice(0, 1).toUpperCase() + userName.slice(1)}👋, Here are your list of task</h2>
                </div>
                <div>
                    <button onClick={CreateTaskOpen} className={Style.newTask}>New task</button>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', margin: "40px 50px 10px 0px" }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}><button className={Style.edit_task_button} onClick={() => EditSelected()}><EditIcon /> Edit</button></div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}><button className={Style.delete_task_button} onClick={() => deleteTask()}><DeleteIcon /> Delete</button></div>
            </div>
            <div className={Style.task_Main_div} >
                {listArr.map((element, i) => (
                    <TaskDescription i={i} element={element} taskRowSelected={taskRow_selected} getStatusBoxClass={getStatusBoxClass} Checkbox_ID_Selected={Checkbox_ID_Selected} key = {element.taskName} />
                ))}
            </div>

            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please update your necessary field
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                            <TextField id="outlined-basic" defaultValue={taskName} onChange={(e) => taskNameChange(e)} label="Task Name" variant="outlined" />
                            <TextField id="outlined-basic" defaultValue={taskDesc} onChange={(e) => taskDescChange(e)} label="Task Description" variant="outlined" />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={handle_Status_Change}
                                >
                                    <MenuItem value={'Work In Progess'}>Work In Progess</MenuItem>
                                    <MenuItem value={'Testing'}>Testing</MenuItem>
                                    <MenuItem value={'In Production'}>In Production</MenuItem>
                                </Select>
                            </FormControl>
                            <button className={Style.Save_buttton} onClick={() => On_Edit_Save()}>Save</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                {/* <Button onClick={CreateTaskOpen}>Open modal</Button> */}
                <Modal
                    open={openCreateTask}
                    onClose={CreateTaskClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please provide necessary details
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                            <TextField id="outlined-basic" onChange={(e) => Create_taskName(e)} label="Please enter Task Name" variant="outlined" />
                            <TextField id="outlined-basic" onChange={(e) => Create_taskDesc(e)} label="Please enter Task Description" variant="outlined" />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={createStatus}
                                    label="Status"
                                    onChange={Create_Task_status}
                                >
                                    <MenuItem value={'Work In Progess'}>Work In Progess</MenuItem>
                                    <MenuItem value={'Testing'}>Testing</MenuItem>
                                    <MenuItem value={'In Production'}>In Production</MenuItem>
                                </Select>
                            </FormControl>
                            <button className={Style.Save_buttton} onClick={() => on_create_task()}>Create Task</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                <Modal
                    open={openErrorMessage}
                    onClose={handleCloseErrorMessage}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={errorStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Error Message
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please select only one field while Editing task
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>

    )
}

export default Task