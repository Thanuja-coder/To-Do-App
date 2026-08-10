import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  //store all tasks
  const [tasks, setTasks] = useState([]);
  //store input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //store edit task values
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  // store search values
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // this is used to show loading while waiting for backend to respond for teh request 
  const [loading, setLoading] = useState(false);
  //Store error message
  const [error, setError] = useState("");
  // Load tasks from backend
  const getTasks = async () => {
    // to show loading message while getting tasks
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
      setError("");
    } catch (error) {
      console.error("error in fetching tasks:", error);
      setError("Unable to load tasks");
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title || !description) {
      setError("Title and description are required");
      return;
    }
    setLoading(true);

    try {
      await API.post("/tasks", { title, description });

      setTitle("");
      setDescription("");
      setError("");
      await getTasks();

    } catch (error) {
      console.error("Error adding task:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to add task");
      }
    }
    //I had an error, that had only the Loading part on the screen, the task list wasn't seen 
    //To correct that i added: 
    //loading is finished after the request 
    setLoading(false);
  };
  // Delete task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/tasks/${id}`);
      await getTasks(); setError("");

    } catch (error) {

      console.error("Error deleting task:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to delete task");
      }
    }
    setLoading(false);
  };
  //Updating task
  const updateTask = async () => {
    if (!editTitle || !editDescription) {
      setError("Title and description are required");
      return;
    }
    setLoading(true);

    try {
      await API.put(`/tasks/${editId}`, {
        title: editTitle,
        description: editDescription
      });
      setEditId("");
      setEditTitle("");
      setEditDescription("");
      setError("");

      await getTasks();

    } catch (error) {

      console.error("Error updating task:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to update task");
      }
    }
    setLoading(false);
  };

  //changing task status
  const changeStatus = async (id) => {
    setLoading(true);
    try {
      await API.patch(`/tasks/${id}/status`, {
        status: "Completed"
      });

      setError("");
      await getTasks();
    } catch (error) {

      console.error("Error changing status:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to change task status");
      }
    }
    setLoading(false);
  };
  //searchin task by its id
  const searchTask = async () => {

    if (!search) {
      setError("Please enter a title to search");
      setSearchResult([]);
      return;
    }
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div>
      <h1>To-Do List Application</h1>
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
        <button onClick={addTask}>Add Task</button></div>

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

                <span className="status">
                  {task.status}
                </span>
              </div>))}</div>
        )}
      </div>

      <div
        className="section-container"
        style={{
          background: "transparent"
        }}
      >

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
              color: "#000000ff"
            }}
          >
            No tasks yet
          </p>
        )}

      </div>

    </div>
  )
};

export default App;