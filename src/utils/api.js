import axios from "axios";

import { getToken, logout } from "../utils/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL
});

// JWT interceptor
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 and 403 errors interceptor
api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if(error) {
    if (error.response.status === 403) {
      logout();
      window.location.href = `${window.location.origin}/`;
    } else if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
});

export default api;