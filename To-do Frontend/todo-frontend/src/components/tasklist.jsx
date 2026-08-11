import React, { useContext, useState } from "react";
import TaskContext from '../Context/taskcontext';

function TaskList() {
    const { tasks, loading, deleteTask, changeStatus, updateTask } = useContext(TaskContext);
    const [editId, setEditId] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    return (
        <div className="section-container">
            <h2>Task List</h2>
            {loading ? (
                <p>Loading tasks...</p>
            ) :
                tasks.map((task) => (
                    <div key={task._id} className="task-card">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <span className={task.status === "Completed" ? "status completed" : "status"}>
                            {task.status}
                        </span>
                        <div style={{ marginTop: "10px" }}>
                            <button
                                className="btn-danger"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => {
                                    setEditId(task._id);
                                    setEditTitle(task.title);
                                    setEditDescription(task.description);
                                }}
                            >
                                Edit
                            </button>

                            {task.status !== "Completed" && (
                                <button
                                    className="btn-success"
                                    onClick={() => changeStatus(task._id)}
                                >
                                    Mark Completed
                                </button>
                            )}
                        </div>

                        {editId === task._id && (
                            <div className="edit-form">
                                <h4>Edit Task</h4>
                                <input
                                    type="text"
                                    placeholder="Edit Title"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Edit Description"
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(e.target.value)
                                    }
                                />
                                <button
                                    className="btn-success"
                                    onClick={async () => {
                                        await updateTask(editId, editTitle, editDescription);
                                        setEditId("");
                                        setEditTitle("");
                                        setEditDescription("");
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setEditId("")}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                ))
            }
            {
                tasks.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "#000000ff"
                        }}
                    >
                        No tasks yet
                    </p>
                )
            }
        </div>
    );
}

export default TaskList;
