import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Store input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Load tasks from backend
  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update task
  const updateTask = async () => {
    if (!editTitle.trim()) {
      alert("Title is required");
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
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Change task status
  const changeStatus = async (id) => {
    try {
      await API.patch(`/tasks/${id}/status`, {
        status: "Completed"
      });
      getTasks();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  // Search task
  const searchTask = async () => {
    try {
      const response = await API.get(`/tasks/search?title=${search}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error searching task:", error);
    }
  };

  return (
    <div>
      <h1>To-Do List App</h1>

      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />
      <button onClick={addTask}>Add Task</button>
      <hr />

      <h2>Search Task</h2>
      <input
        type="text"
        placeholder="Enter task title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchTask}>Search</button>
      <br /><br />

      {searchResult.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status : {task.status}</p>
        </div>
      ))}

      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status : {task.status}</p>

          <button onClick={() => deleteTask(task._id)}>Delete</button>
          <button onClick={() => {
            setEditId(task._id);
            setEditTitle(task.title);
            setEditDescription(task.description);
          }}>
            Edit
          </button>
          <button onClick={() => changeStatus(task._id)}>Mark Completed</button>

          {editId === task._id && (
            <div style={{ marginTop: "15px", padding: "10px", border: "1px dashed gray" }}>
              <h4>Edit Task</h4>
              <input
                type="text"
                placeholder="Edit Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <br /><br />
              <input
                type="text"
                placeholder="Edit Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <br /><br />
              <button onClick={updateTask}>Update Task</button>
              <button onClick={() => setEditId("")}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;