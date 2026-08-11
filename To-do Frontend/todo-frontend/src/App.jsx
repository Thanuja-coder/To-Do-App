import { useContext } from "react";
import "./App.css";
import TaskForm from "./components/taskform";
import TaskList from "./components/tasklist";
import SearchBar from "./components/searchbar";
import TaskContext from "./Context/taskcontext";

function App() {
  // getting the common values from Context
  const { error } = useContext(TaskContext);

  return (
    <div>
      <h1>To-Do List Application</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <TaskForm />

      <SearchBar />

      <div
        className="section-container"
        style={{
          background: "transparent"
        }}
      >
        <TaskList />
      </div>

    </div>
  );
}

export default App;
