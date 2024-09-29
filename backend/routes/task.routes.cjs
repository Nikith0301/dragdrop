const express = require("express");
const { addTask, updateTask, fetchTasks } = require("../controllers/task.controller.cjs");

const router = express.Router();

// Define routes
router.get("/", fetchTasks);
router.post("/add", addTask); // Expecting body

router.post("/update/:uid", updateTask); // Expecting body

module.exports = router; // Export the router
