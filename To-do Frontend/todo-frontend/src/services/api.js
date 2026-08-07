import axios from "axios";

const API = axios.create({
    baseURL: "https://todo-backend-fc8s.onrender.com"
});

export default API;