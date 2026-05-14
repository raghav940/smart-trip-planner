import axios from 'axios'
const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: base,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

// attach access token to requests
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// response interceptor to handle 401 -> refresh
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

instance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config
    if (err.response && err.response.status === 401 && !originalRequest._retry){
      if (isRefreshing){
        return new Promise(function(resolve, reject){
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return instance(originalRequest)
        }).catch(e => Promise.reject(e))
      }

      originalRequest._retry = true
      isRefreshing = true
      try{
        const response = await instance.post('/auth/refresh')
        const newToken = response.data.accessToken
        if (newToken){
          localStorage.setItem('accessToken', newToken)
          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`
          processQueue(null, newToken)
          return instance(originalRequest)
        }
      }catch(refreshError){
        processQueue(refreshError, null)
        localStorage.removeItem('accessToken')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  }
)

export default instance
