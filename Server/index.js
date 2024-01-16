// console.log("hello world")
import dataBase from './Database/db.js'
import express from 'express';
import dotenv from 'dotenv';
import getUser from './Route/userDetail.js'
import getTask from './Route/Task.js'
dotenv.config();


const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())

// Retrieve blog post including category and everything

app.use('/', getUser)
app.use('/', getTask)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


dataBase();