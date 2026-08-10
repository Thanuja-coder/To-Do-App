// import task service
const taskService = require("../service/taskservice");
// controller to add a new task
async function addTask(req, res) {

    try {

        const { title, description } = req.body;
        // check if title and description are empty
        if (!title || !description || title.trim() === "" || description.trim() === "") {
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

        // Handle errors from the service or database
        res.status(500).json({
            message: "Error adding task",
            error: error.message
        });

    }
}

// Controller to get all tasks
async function getAllTasks(req, res) {

    try {

        // Get all tasks from service
        const tasks = await taskService.getAllTasks();

        res.status(200).json(tasks);

    } catch (error) {

        // Handle error while getting tasks
        res.status(500).json({
            message: "Error getting tasks",
            error: error.message
        });

    }
}

// Controller to update a task
async function updateTask(req, res) {

    try {

        // Get task id from URL
        const taskId = req.params.id;

        // Check if id is provided
        if (!taskId) {
            return res.status(400).json({
                message: "Task id is required"
            });
        }

        // check if title and description are provided
        const { title, description } = req.body;

        if (!title || !description || title.trim() === "" || description.trim() === "") {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
        // update task using service
        const updatedTask = await taskService.updateTask(taskId, req.body);
        // check if task was found
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

        // Handle update error
        res.status(500).json({
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
        // check if id is provided
        if (!taskId) {
            return res.status(400).json({
                message: "Task id is required"
            });
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

        // Handle delete error
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });

    }
}
// Controller to update task status
async function updateTaskStatus(req, res) {
    try {
        // get task id from URL
        const taskId = req.params.id;
        // get status from request body
        const { status } = req.body;
        // check if status is provided
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }
        // check if status is valid
        if (status !== "Pending" && status !== "Completed") {
            return res.status(400).json({
                message: "Status must be Pending or Completed"
            });
        }

        // update status using service
        const updatedTask = await taskService.updateTaskStatus(taskId, status);

        // check if task exists
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

        // handle status update error
        res.status(500).json({
            message: "Error updating task status",
            error: error.message
        });

    }
}
// controller to search task
async function searchTask(req, res) {
    try {
        // get search text from query
        const title = req.query.title;
        // check if search text is provided
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Please enter a title to search"
            });
        }

        // search task using service
        const tasks = await taskService.searchTask(title);

        // Check if no task was found
        if (!tasks) {
            return res.status(404).json({
                message: "No tasks found with this title"
            });
        }

        res.status(200).json(tasks);

    } catch (error) {

        // Handle search error
        res.status(500).json({
            message: "Error searching tasks",
            error: error.message
        });

    }
}
// export controller functions
module.exports = {

    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    searchTask

};