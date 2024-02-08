import axios from "axios";
import { urls } from "./urls";

export const appAPI = axios.create({
    baseURL: urls.backendURL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
  });  

export const autoAPI = axios.create({
    baseURL: urls.apiURL,
    headers: {'Content-Type': 'application/json'}
  });