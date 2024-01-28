import express from 'express';
import taskSchema from '../Module/taskSchema.js'
import bcrypt from 'bcrypt'
import checkapiKey from '../Middleware/middleware.js';

const apiRouter = express.Router()



apiRouter.get('/allTask', checkapiKey, async (req, res) => {
    try {
        const taskList = await taskSchema.find({ userId: req.user.email })
        res.send(taskList)
    } catch (error) {
        res.status(500).send("Network error")
    }
})

apiRouter.post('/createTask', checkapiKey, async (req, res) => {
    try {
        const { taskName, taskDesc, status } = req.body
        const checkTaskTitle = await taskSchema.findOne({ userId: req.user.email, taskName: taskName });
        if (checkTaskTitle !== null) {
            return res.send("Task with the same title has already been created");
        }
        const createTask = await taskSchema.create({ userId: req.user.email, taskName, taskDesc, status, lastUpdated: new Date().toDateString() })
        res.send(createTask)
    } catch (error) {
        res.status(500).send({ "Network error": error })
    }
})

apiRouter.put('/updateTask', checkapiKey, async (req, res) => {
    try {
        const taskNamereq = req.body.taskName
        const updateTaskName = req.body.updatedtaskName
        const updateTaskDesc = req.body.taskDesc
        const updateTaskStatus = req.body.status
        const taskList = await taskSchema.find({ userId: req.user.email })
        const filter = { userId: req.user.email, taskName: taskNamereq }
        const update = { taskName: updateTaskName, taskDesc: updateTaskDesc, status: updateTaskStatus }
        const updateData = await taskSchema.findOneAndUpdate(filter, update, { new: true })
        if (!updateData) {
            return res.send({ "error": "Task not found or not updated." });
        }
        res.send(taskList)

    } catch (error) {
        res.status(500).send({ "Network error": error })
    }
})

apiRouter.delete('/deleteTask', checkapiKey, async (req, res) => {
    try {
        const deleteData = await taskSchema.deleteOne({ userId: req.user.email, taskName: req.body.taskName })
        if (!deleteData) {
            return res.send({ "error": "Task not found or not deleted." });
        }
        res.send(deleteData)
    } catch (error) {
        res.status(500).send({ "Network error": error })
    }
})
apiRouter.delete('/deleteAll', checkapiKey, async (req, res) => {
    const delete_all_data = await taskSchema.deleteMany({ userId: req.user.email })
    if (!delete_all_data) {
        return res.send({ "error": "Task not found or not deleted." });
    }
    res.send(delete_all_data)
})


export default apiRouter