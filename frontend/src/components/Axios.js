import axios from "axios";

const instance = axios.create({
  // this connects the backend
  baseURL: "http://localhost:5000",
  // https://api.tenreck.com
  // http://localhost:5000
});

export default instance;