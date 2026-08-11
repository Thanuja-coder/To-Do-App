
const taskService = require("../service/taskservice");
const mongoose = require("mongoose")

// controller to add a new task
async function addTask(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
        const newTask = await taskService.addTask(req.body);
        res.status(201).json({
            message: "Task added successfully",
            data: newTask
        });

    } catch (error) {
        // handled the error from the database
        res.status(400).json({
            message: "Error adding task",
            error: error.message
        });

    }
}
//controller to get all tasks from the database
async function getAllTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);

    } catch (error) {
        res.status(400).json({
            message: "Error getting tasks",
            error: error.message
        });
    }
}

//controller to update a task
async function updateTask(req, res) {
    try {
        // Geting the task id from URL
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(404).json({
                message: "Task id is required"
            });
        }
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "invalid task Id"
            })
        }
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
        const updatedTask = await taskService.updateTask(taskId, req.body);
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask
        });

    } catch (error) {
        // Handled update error
        res.status(400).json({
            message: "Error updating task",
            error: error.message
        });

    }
}
// controller to delete a task
async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(400).json({
                message: "Task id is required"
            });
        }
        //checking if the id provided is according to the mongoDb format 
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "invalid task Id"
            })
        }
        const deletedTask = await taskService.deleteTask(taskId);
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task deleted successfully",
            data: deletedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });

    }
}
//controller to update task status
async function updateTaskStatus(req, res) {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "invalid task Id"
            })
        }

        if (status !== "Pending" && status !== "Completed") {
            return res.status(400).json({
                message: "Status must be Pending or Completed"
            });
        }
        // update status using service
        const updatedTask = await taskService.updateTaskStatus(taskId, status);
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: "Task status updated successfully",
            data: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task status",
            error: error.message
        });
    }
}

// controller to search task
async function searchTask(req, res) {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({
                message: " enter a title to search"
            });
        }
        const tasks = await taskService.searchTask(title);
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Error searching tasks",
            error: error.message
        });
    }
}
// exporing the controller functions here 
module.exports = {
    addTask, getAllTasks, updateTask, deleteTask, updateTaskStatus, searchTask
};