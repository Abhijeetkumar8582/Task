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
import { toggleSelected } from '../Redux/Action/index.js'
// import { count } from '../Redux/Action/index.js'
import { useDispatch, useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Task() {
    const dispatch = useDispatch()
    const User_Access_Token = useSelector(state => state.accessToken);
    const user_Name = useSelector(state => state.userName);

    const user_Selected = useSelector((state) => state.selectCheckBox.selectedDelete);

    console.log(user_Selected)

    const [listArr, setListArr] = useState([])

    const Checkbox_ID_Selected = (taskName) => {
        dispatch(toggleSelected(taskName))
    }


    useEffect(() => {
        fetch(`http://localhost:4000/allTask`, {
            method: "GET",
            headers: {
                "Authorization": User_Access_Token
            }
        })
            .then(response => response.json())
            .then(result => {
                setListArr(result)

            })
            .catch(error => console.log('error', error));
    }, [setListArr]);
    

    const deleteTask = () => {
        if (user_Selected.length === 1) {
            fetch('http://localhost:4000/deleteTask', {
                method: "delete",
                headers: {
                    "Authorization": User_Access_Token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userId": User_Access_Token,
                    "taskName": user_Selected[0]
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setListArr((prevSelected) => [...prevSelected, data])
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
                listArr[i].taskName = taskName
                listArr[i].description = taskDesc
                listArr[i].status = status
                fetch('http://localhost:4000/updateTask', {
                    method: "PUT",
                    headers: {
                        "Authorization": User_Access_Token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "taskName": user_Selected[0],
                        "taskDesc": taskDesc,
                        "status": status
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setListArr(data)
                    })
                    .catch((err) => console.log(err))
                handleClose()
                console.log(listArr)
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
        fetch('http://localhost:4000/createTask', {
            method: "POST",
            headers: {
                "Authorization": User_Access_Token,
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
        fetch('http://localhost:4000/createTask', {
            method: "POST",
            headers: {
                "Authorization": User_Access_Token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => setListArr((prevSelected) => [...prevSelected, data]))
    }
    return (
        <div style={{ padding: '2rem', background: 'linen', height: '90vh' }} >

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Hey {user_Name.slice(0, 1).toUpperCase() + user_Name.slice(1)}👋, Here are your list of task</h2>
                </div>
                <div>
                    <button onClick={CreateTaskOpen} className={Style.newTask}>New task</button>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', margin: "40px 50px 10px 0px" }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}><button className={Style.edit_task_button} onClick={() => EditSelected()}><EditIcon /> Edit</button></div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}><button className={Style.delete_task_button} onClick={() => deleteTask()}><DeleteIcon /> Delete</button></div>
            </div>
            <div className={Style.task_div}>
                <div className={Style.task_Main_div}>
                    <div className={Style.list_Task}><input type="checkbox" />Id</div>
                    <div className={Style.list_Task}>Task Name</div>
                    <div className={Style.list_Task}>Task Description</div>
                    <div className={Style.list_Task}>Status</div>
                    <div className={Style.list_Task}>last Updated</div>

                </div>
                <div>
                    {listArr.map((element, i) => (
                        <div className={Style.task_row_div} key={i}>
                            <div className={Style.list_Task}><input type="checkbox" onChange={() => Checkbox_ID_Selected(`${element.taskName}`)} />{element.id}</div>
                            <div className={Style.list_Task}>{element.taskName}</div>
                            <div className={Style.list_Task}>{element.taskDesc}</div>
                            <div className={Style.list_Task} ><span style={{ background: 'red', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>{element.status}</span></div>
                            <div className={Style.list_Task}>{element.lastUpdated}</div>
                        </div>
                    ))}
                </div>
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