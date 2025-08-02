import axios from "axios";
import { API_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {'Authorization': `Bearer ${localStorage?.getItem('accessToken')}`}
})