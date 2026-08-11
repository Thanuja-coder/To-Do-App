import React, { useState, useEffect } from 'react';
import API from "../services/api";
import TaskContext from './taskcontext';

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // to get tasks
    const getTasks = async () => {
        setLoading(true);
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
            setError("");
        } catch (error) {
            console.error("error in fetching tasks:", error);
            setError("Unable to load tasks");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => { getTasks(); }, []);

    // to add a task 
    const addTask = async (title, description) => {
        if (!title || !description) {
            setError("Title and description are required");
            return;
        }
        setLoading(true);

        try {
            await API.post("/tasks", { title, description });
            setError("");
            await getTasks();
        } catch (error) {
            console.error("Error adding task:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unable to add task");
            }
        } finally {
            setLoading(false);
        }
    };

    //delete task
    const deleteTask = async (id) => {
        setLoading(true);
        try {
            await API.delete(`/tasks/${id}`);
            await getTasks(); 
            setError("");
        } catch (error) {
            console.error("Error deleting task:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unable to delete task");
            }
        } finally {
            setLoading(false);
        }
    };

    //Updating task
    const updateTask = async (id, title, description) => {
        if (!title || !description) {
            setError("Title and description are required");
            return;
        }
        setLoading(true);

        try {
            await API.put(`/tasks/${id}`, { title, description });
            setError("");
            await getTasks();
        } catch (error) {
            console.error("Error updating task:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unable to update task");
            }
        } finally {
            setLoading(false);
        }
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
        } finally {
            setLoading(false);
        }
    };

    //search task by its title
    const searchTask = async (search) => {
        if (!search) {
            setError("Please enter a title to search");
            return [];
        }
        setLoading(true);
        try {
            const response = await API.get(`/tasks/search?title=${search}`);
            setError("");
            return response.data;
        } catch (error) {
            console.error("Error searching task:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Unable to search task");
            }
            return [];
        } finally {
            setLoading(false);
        }
    }

    return (
        <TaskContext.Provider value={{ 
            tasks, loading, error, getTasks, addTask, deleteTask, updateTask, changeStatus, searchTask 
        }}>
            {children}
        </TaskContext.Provider>
    );
};
export default TaskProvider;