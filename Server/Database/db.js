import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = `mongodb+srv://User_registration:Jan1457%40mongodb@cluster0.xs2ztmm.mongodb.net/userdatabase?retryWrites=true&w=majority`

async function connectToMongoDb () {
    try{
        await mongoose.connect(URL)
        console.log('MongoDB connected');
    }
    catch{
        console.log('MongoDB is not connected');
    }
}

export default connectToMongoDb;