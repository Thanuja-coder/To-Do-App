import React, { useContext, useState } from "react";
import TaskContext from "../Context/taskcontext";

function SearchBar() {
    const { searchTask, loading } = useContext(TaskContext);
    const [search, setSearch] = useState("");
    const [searchresult, setsearchresult] = useState([]);

    const handleSearch = async () => {
        const result = await searchTask(search);
        setsearchresult(result || []);
    };

    return (
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
                onClick={handleSearch}>
                Search
            </button>

            <button
                className="btn-secondary"
                onClick={() => { setSearch(""); setsearchresult([]); }}>
                Clear
            </button>

            {searchresult.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    {searchresult.map((task) => (
                        <div key={task._id} className="task-card">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <span className="status">
                                {task.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {searchresult.length === 0 && search !== "" && !loading && (
                <p style={{ marginTop: "20px", color: "red" }}>No tasks found matching</p>
            )}
        </div>
    );
}

export default SearchBar;