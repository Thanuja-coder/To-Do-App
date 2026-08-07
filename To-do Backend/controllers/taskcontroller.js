// Import task service
const taskService = require("../service/taskservice");

// Controller to add a new task
async function addTask(req, res) {

    const newTask = await taskService.addTask(req.body);

    res.status(201).json({
        message: "Task added successfully",
        data: newTask
    });

}

// Controller to get all tasks
async function getAllTasks(req, res) {

    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);

}

// Controller to update a task
async function updateTask(req, res) {

    const updatedTask = await taskService.updateTask(
        req.params.id,
        req.body
    );

    res.status(200).json({
        message: "Task updated successfully",
        data: updatedTask
    });

}
// Controller to delete a task
async function deleteTask(req, res) {

    const deletedTask = await taskService.deleteTask(req.params.id);

    res.status(200).json({
        message: "Task deleted successfully",
        data: deletedTask
    });

}
// Controller to update task status
async function updateTaskStatus(req, res) {

    const updatedTask = await taskService.updateTaskStatus(
        req.params.id,
        req.body.status
    );

    res.status(200).json({
        message: "Task status updated successfully",
        data: updatedTask
    });

}
// Controller to search task
async function searchTask(req, res) {

    const tasks = await taskService.searchTask(req.query.title);

    res.status(200).json(tasks);

}
// Export controller functions
module.exports = {

    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    searchTask

};