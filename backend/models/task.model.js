import mongoose from "mongoose"


const Tasks = new mongoose.Schema({
  text: { type: String, required: true },
  tag: { type: String,default:"green" },
uid:{type:String}
});


const taskSchema= new mongoose.Schema({

tasks:[Tasks],
date:{type:Date,default:Date.now}
})

export const Task= mongoose.model("Task",taskSchema)