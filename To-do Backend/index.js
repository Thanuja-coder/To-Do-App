const express = require("express");
const cors = require("cors");
require("dotenv").config({ override: true });

// Import task routes
const taskRoutes = require("./routes/taskroutes");
const DbConnection = require("./databaseConnection");

const app = express();

const PORT = 8081;

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Use task routes
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to To-Do List API"
    });
});

DbConnection();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});