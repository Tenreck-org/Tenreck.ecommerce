import axios from "axios";

const instance = axios.create({
  // this connects the backend
  baseURL: "https://api.tenreck.com",
  // https://api.tenreck.com
  // http://localhost:5000
});

export default instance;
