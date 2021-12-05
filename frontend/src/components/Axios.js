import axios from "axios";

const instance = axios.create({
  // this connects the backend
  //slack commit test
  baseURL: "https://api.tenreck.tech",
});

export default instance;