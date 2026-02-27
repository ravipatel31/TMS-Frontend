import axios from 'axios'
import { toast } from 'react-toastify'

let toastShown = false


const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL || 'https://www.complyco.com.au/',
  
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or fetch the token from wherever it's stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  error => {
    console.log('API error', error)
    if (error.response?.data?.message === 'Please provide valid token') {
      handleLogout()
    }
    return Promise.reject(error)
  }
)

const handleLogout = () => {
  if (!toastShown) {
    toast.error('Your session has expired. Please log in again to continue.', {
      autoClose: 2000
    })
    toastShown = true
  }
}

export default instance
