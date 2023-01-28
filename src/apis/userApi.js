import axios from "axios";
import { baseURL } from "./instance";

export const signUp = async (payload) => {
  const response = await axios.post(`${baseURL}auth/signup`, payload);
  return response;
};

export const signIn = async (payload) => {
  const response = await axios.post(`${baseURL}auth/signin`, payload);
  return response;
};
