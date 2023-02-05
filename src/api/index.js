import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});