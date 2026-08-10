// Import mongoose
const mongoose = require("mongoose");

// Create the schema for storing task details
const taskSchema = new mongoose.Schema({

    // Task title is required
    title: {
        type: String,
        required: true
    },

    // Task description is required
    description: {
        type: String,
        required: true
    },

    // Task status can only have these values
    status: {
        type: String,
        enum: ["Pending", "Completed"],
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