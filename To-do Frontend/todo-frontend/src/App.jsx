import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {

  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Store input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Store edit task values
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Store search values
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Store error message
  const [error, setError] = useState("");

  // Load tasks from backend
  const getTasks = async () => {

    try {

      const res = await API.get("/tasks");
      setTasks(res.data);
      setError("");

    } catch (error) {

      console.error("Error fetching tasks:", error);
      setError("Unable to load tasks");

    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Add new task
  const addTask = async () => {

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {

      await API.post("/tasks", {
        title,
        description
      });

      setTitle("");
      setDescription("");
      setError("");

      getTasks();

    } catch (error) {

      console.error("Error adding task:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to add task");
      }
    }
  };

  // Delete task
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);
      setError("");
      getTasks();

    } catch (error) {

      console.error("Error deleting task:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to delete task");
      }
    }
  };

  // Update task
  const updateTask = async () => {

    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Title and description are required");
      return;
    }

    try {

      await API.put(`/tasks/${editId}`, {
        title: editTitle,
        description: editDescription
      });

      setEditId("");
      setEditTitle("");
      setEditDescription("");
      setError("");

      getTasks();

    } catch (error) {

      console.error("Error updating task:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to update task");
      }
    }
  };

  // Change task status
  const changeStatus = async (id) => {

    try {

      await API.patch(`/tasks/${id}/status`, {
        status: "Completed"
      });

      setError("");
      getTasks();

    } catch (error) {

      console.error("Error changing status:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to change task status");
      }
    }
  };

  // Search task
  const searchTask = async () => {

    if (!search.trim()) {
      setError("Please enter a title to search");
      setSearchResult([]);
      return;
    }

    try {

      const response = await API.get(
        `/tasks/search?title=${search}`
      );

      setSearchResult(response.data);
      setError("");

    } catch (error) {

      console.error("Error searching task:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to search task");
      }

      setSearchResult([]);
    }
  };

  return (
    <div>

      <h1>To-Do List App</h1>

      {/* Show error message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

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

        <button onClick={addTask}>Add Task</button>

      </div>

      <div className="section-container">

        <h2>Search Task</h2>

        <input
          type="text"
          placeholder="Enter task title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn-secondary"
          onClick={searchTask}
        >
          Search
        </button>

        <button
          className="btn-secondary"
          onClick={() => setSearchResult([])}
        >
          Clear
        </button>

        {searchResult.length > 0 && (
          <div style={{ marginTop: "20px" }}>

            {searchResult.map((task) => (

              <div key={task._id} className="task-card">

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <span
                  className={`status ${task.status === "Completed"
                      ? "completed"
                      : ""
                    }`}
                >
                  {task.status}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

      <div
        className="section-container"
        style={{
          background: "transparent",
          boxShadow: "none",
          padding: "0"
        }}
      >

        <h2>Task List</h2>

        {tasks.map((task) => (

          <div key={task._id} className="task-card">

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span
              className={`status ${task.status === "Completed"
                  ? "completed"
                  : ""
                }`}
            >
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
                  setError("");
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
                  onClick={updateTask}
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

        ))}

        {tasks.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#6B7280"
            }}
          >
            No tasks yet! Add one above.
          </p>
        )}

      </div>

    </div>
  );
}

export default App;