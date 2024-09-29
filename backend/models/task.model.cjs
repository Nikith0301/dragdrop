const mongoose = require("mongoose");

const SingleTask = new mongoose.Schema({
  text: { type: String, required: true },
  tag: { type: String, default: "green" },
  uid: { type: String }
});

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  tag: { type: String, default: "green" },
  uid: { type: String },
  date: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);

// Export the Task model
module.exports = { Task };
