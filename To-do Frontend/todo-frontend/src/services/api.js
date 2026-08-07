// Import axios
import axios from "axios";

// Backend URL
const API = axios.create({
    baseURL: "http://localhost:8081"
});

// Export API
export default API;