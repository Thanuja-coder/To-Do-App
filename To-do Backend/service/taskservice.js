// import Task model
const Task = require("../models/task model");

// import Task DTO
const TaskDto = require("../dtos/taskdtos");

// function to add a new task
async function addTask(taskData) {
    const task = new TaskDto(taskData);
    // save task in MongoDB
    const newTask = await Task.create(task);

    return newTask;
}
// function to get all tasks
async function getAllTasks() {

    const tasks = await Task.find();
    return tasks;
}
// function to update a task
async function updateTask(id, taskData) {

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        taskData,
        { new: true }
    );
    return updatedTask;
}

// function to delete a task
async function deleteTask(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
}
// function to update task status
async function updateTaskStatus(id, status) {
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );
    return updatedTask;
}
// function to search task by title
// Function to search task by title
async function searchTask(title) {

    const tasks = await Task.find({
        title: { $regex: title, $options: "i" }
    });

    // Check if no task was found
    if (tasks.length === 0) {
        return null;
    }

    return tasks;
}
// export all service functions
module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    searchTask
};