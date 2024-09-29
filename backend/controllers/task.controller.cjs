const { Task } = require("../models/task.model.cjs");

// Fetch Tasks
async function fetchTasks(req, res) {
  try {
    const data = await Task.find();
    res.json({ success: true, message: "Here's the tasks", tasks: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Could not find tasks" });
  }
}

// Add Task
async function addTask(req, res) {
  const { text, tag, uid } = req.body;
  try {
    const newTask = new Task({ text, tag, uid });
    await newTask.save();
    res.json({ success: true, message: "Task added successfully", data: newTask });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Unable to add task" });
  }
}

// Update Task
async function updateTask(req, res) {
  const { uid } = req.params; // Assuming uid is passed as a URL parameter
  const { tag: newColor } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { uid },
      { tag: newColor },
      { new: true } // Return the updated document
    );
    if (updatedTask) {
      res.json({ success: true, message: "Task updated successfully", data: updatedTask });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Could not update task" });
  }
}

// Export functions
module.exports = {
  fetchTasks,
  addTask,
  updateTask,
};
