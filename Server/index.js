// console.log("hello world")
import dataBase from './Database/db.js'
import express from 'express';
import dotenv from 'dotenv';
import getBlog from './Route/userDetail.js'
dotenv.config();


const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())

// Retrieve blog post including category and everything

app.use('/', getBlog)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


dataBase();