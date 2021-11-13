import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.158.135.18:5000",
//   localhost:50000
});


export default instance;