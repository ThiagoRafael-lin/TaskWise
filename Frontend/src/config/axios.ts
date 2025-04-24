import axios from "axios";

const baseURL = "http://localhost:5161/api";

const api = axios.create({
  baseURL,
});

export default api;
