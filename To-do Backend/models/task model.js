// Import mongoose
const mongoose = require("mongoose");

// Create the schema for storing task details
const taskSchema = new mongoose.Schema({

    // Task title
    title: {
        type: String,
        required: true
    },

    // Task description
    description: {
        type: String,
        required: true
    },

    // Task status
    status: {
        type: String,
        default: "Pending"
    },

    // Date when task is created
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Create model
const Task = mongoose.model("Task", taskSchema);

// Export model
module.exports = Task;