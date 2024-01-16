import express from 'express';
import userSchema from '../Module/userSchema.js'
import bcrypt from 'bcrypt'
const apiRouter = express.Router()


apiRouter.get('/allBlog')