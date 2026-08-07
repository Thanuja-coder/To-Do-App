// Import Task model
const Task = require("../models/task model");

// Import Task DTO
const TaskDto = require("../dtos/taskdtos");

// Function to add a new task
async function addTask(taskData) {

    // Convert request data into DTO object
    const task = new TaskDto(taskData);

    // Save task into MongoDB
    const newTask = await Task.create(task);

    return newTask;
}

// Function to get all tasks
async function getAllTasks() {

    return await Task.find();

}
// Function to update a task
async function updateTask(id, taskData) {

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        taskData,
        { new: true }
    );

    return updatedTask;

}
// Function to delete a task
async function deleteTask(id) {

    const deletedTask = await Task.findByIdAndDelete(id);

    return deletedTask;

}
// Function to update task status
async function updateTaskStatus(id, status) {

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );

    return updatedTask;

}
// Function to search task by title
async function searchTask(title) {

    const tasks = await Task.find({

        title: { $regex: title, $options: "i" }

    });

    return tasks;

}
// Export all service functions
module.exports = {

    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    searchTask

};