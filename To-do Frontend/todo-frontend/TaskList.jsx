// Import hooks
import { useEffect, useState } from "react";
// Import API endpoints
import API from "../services/api";
function TaskList() {
    // storing all tasks in the way
    const [tasks, setTasks] = useState([]);

    // loaing the tasks when page opens
    useEffect(() => {
        getTasks();


    }, []);

    // I wrote a function to get tasks and diaplay on the screen
    async function getTasks() {
        const response = await API.get("/tasks");
        setTasks(response.data);

    }
    return (
        <div>
            <h2>Task List</h2>

            {
                tasks.map((task) => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status : {task.status}</p>
                        <hr />
                    </div>

                ))
            } </div>

    );
}
export default TaskList;