import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
 userId:String,
 taskName:String,
 taskDesc:String,
 status:String,
 lastUpdated:String
});

const taskSchemavalue = mongoose.model('taskSchema', taskSchema,'taskSchema');

export default taskSchemavalue;