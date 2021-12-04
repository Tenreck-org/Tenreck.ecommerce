import axios from "axios";

const instance = axios.create({
  // this connects the backend
  //making this commit to see if the invalid email would go away
  //gpg key test
  baseURL: "https://api.tenreck.com",
});

export default instance;