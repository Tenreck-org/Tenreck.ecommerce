import axios from "axios";

const instance = axios.create({
  // this connects the backend
  baseURL: "https://api.tenreck.com",
});

export default instance;