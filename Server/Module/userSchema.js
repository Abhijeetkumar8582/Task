import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
 name:String,
 email:String,
 password:String,
 userId:Number,
 createOn:String
 
});

const schema = mongoose.model('User', blogSchema,'users');

export default schema;