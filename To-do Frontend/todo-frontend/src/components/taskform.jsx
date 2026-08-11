import React, { useContext, useState } from "react";
import TaskContext from "../Context/taskcontext";

function TaskForm() {
    const { addTask, error } = useContext(TaskContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleAddTask = async () => {
        await addTask(title, description);
        setTitle(""); setDescription("");
    };

    return (
        <div className="section-container">
            <h2>Add Task</h2>
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button></div>
    );
}
export default TaskForm