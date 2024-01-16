import express from 'express';
import taskSchema from '../Module/taskSchema.js'
import bcrypt from 'bcrypt'
import checkapiKey from '../Middleware/middleware.js';

const apiRouter = express.Router()



apiRouter.get('/allBlog', checkapiKey, async (req, res) => {
    try {
        const taskList = await taskSchema.find()
        res.send(req.user.email)
    } catch (error) {
        res.status(500).send("Network error")
    }
})

apiRouter.post('/createBlog', checkapiKey, async (req, res) => {
    try {
        const { taskName, taskDesc, status } = req.body
        const checkTaskTitle = await taskSchema.findOne({ userId: req.user.email, taskName: taskName });
        console.log(checkTaskTitle)
        if (checkTaskTitle !== null) {
            return res.send("Task with the same title has already been created");
        }
        const createTask = await taskSchema.create({ userId: req.user.email, taskName, taskDesc, status, lastUpdated: new Date().toISOString() })
        res.send(createTask)
    } catch (error) {
        res.status(500).send({"Network error":error})
    }
})
export default apiRouter