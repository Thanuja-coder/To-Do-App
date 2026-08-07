// Import express
const express = require("express");

// Create router object
const router = express.Router();

// Import controller
const taskController = require("../controllers/taskcontroller");

// Route to add a new task
router.post("/", taskController.addTask);
// Route to search task
router.get("/search", taskController.searchTask);

// Route to get all tasks
router.get("/", taskController.getAllTasks);
// Route to update a task
router.put("/:id", taskController.updateTask);

// Route to delete a task
router.delete("/:id", taskController.deleteTask);
// Route to update task status
router.patch("/:id/status", taskController.updateTaskStatus);
// Export router
module.exports = router;