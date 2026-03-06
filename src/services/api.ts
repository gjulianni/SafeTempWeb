import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.15.2:3000/api/', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-platform': 'web' 
  }
});

export default api;