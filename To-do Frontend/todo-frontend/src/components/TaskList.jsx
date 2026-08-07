// Import hooks
import { useEffect, useState } from "react";

// Import API
import API from "../services/api";

function TaskList() {

    // Store all tasks
    const [tasks, setTasks] = useState([]);

    // Load tasks when page opens
    useEffect(() => {

        getTasks();

    }, []);

    // Function to get tasks
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
            }

        </div>

    );

}

export default TaskList;