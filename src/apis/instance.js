import axios from "axios";

const myToken = localStorage.getItem("Authorization");

export const baseURL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export default instance;
