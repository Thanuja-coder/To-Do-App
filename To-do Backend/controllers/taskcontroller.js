// import task service
const taskService = require("../service/taskservice");
//used to check whether the objectId id vaild and in mongodb format 
const mongoose = require("mongoose")
// controller to add a new task
async function addTask(req, res) {
    try {
        const { title, description } = req.body;
        // checking if title and description are empty
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
        // Get all tasks using service
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);

    } catch (error) {
        // Handled error while getting tasks
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
        // checking if the id is provided
        if (!taskId) {
            return res.status(404).json({
                message: "Task id is required"
            });
        }
        //checking if the id provided is according to the mongoDb format 
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "invalid task Id"
            })
        }
        // check if title and description are provided
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
        // updating the task using the service
        const updatedTask = await taskService.updateTask(taskId, req.body);
        // checking if the task was found
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
        // get task id from URL
        const taskId = req.params.id;
        // checking if id is provided
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
        // delete task using service
        const deletedTask = await taskService.deleteTask(taskId);
        // check if task exists
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
        // Handled delete error
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });

    }
}
//controller to update task status
async function updateTaskStatus(req, res) {
    try {
        // geting task id from URL
        const taskId = req.params.id;
        // get status from request body
        const { status } = req.body;
        // checking if status is provided
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }
        //checking if the id provided is according to the mongoDb format 
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "invalid task Id"
            })
        }
        // check if status is valid
        if (status !== "Pending" && status !== "Completed") {
            return res.status(400).json({
                message: "Status must be Pending or Completed"
            });
        }
        // update status using service
        const updatedTask = await taskService.updateTaskStatus(taskId, status);
        // checking if task exists
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
        // handled status update error 
        res.status(500).json({
            message: "Error updating task status",
            error: error.message
        });
    }
}
// controller to search task
async function searchTask(req, res) {
    try {
        // get search text from the user
        const title = req.query.title;
        // check if search text is provided
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: " enter a title to search"
            });
        }
        // searching task using service
        const tasks = await taskService.searchTask(title);
        // checking if no task was found
        if (!tasks) {
            return res.status(404).json({
                message: "No tasks found with this title"
            });
        }
        res.status(200).json(tasks);
    } catch (error) {
        // handled search error
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