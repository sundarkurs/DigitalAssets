import axios from "axios";

const instance = axios.create({
  baseURL: "http://digitalassets.com/api/v1/",
});

export default instance;