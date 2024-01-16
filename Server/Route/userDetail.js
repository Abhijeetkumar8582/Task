import express from 'express';
import userSchema from '../Module/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const apiRouter = express.Router()

apiRouter.post('/createUserProfile', async (req, res) => {
    try {
        const Checkprofile = req.body.email
        const findProfile = await userSchema.find({ email: Checkprofile })
        if (findProfile.length !== 0) {
            return res.send("Profile is already Created, please login")
        }
        const { name, email, password } = req.body
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createUser = await userSchema.create({ name, email, password: hashedPassword })
        res.send(createUser)
    } catch (error) {
        res.status(500).send('Network Error')
    }
})

apiRouter.get('/login', async (req, res) => {
    try {
        const userEmail = req.body.email
        const userPassword = req.body.password
        const findEmail = await userSchema.findOne({ email: userEmail })
        if (!findEmail) {
            return res.send("Invalid Email ID details")
        }
        const decryptPassword = await bcrypt.compare(userPassword, findEmail.password)
        if (!decryptPassword) {
            return res.send("Invalid User details")
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ email: userEmail }, jwtSecretKey);
        res.send({
            accessToken: token
        })
    } catch (error) {
        res.status(500).send('Network Error')
    }
})

export default apiRouter;