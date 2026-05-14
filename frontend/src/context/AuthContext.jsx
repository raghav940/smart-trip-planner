import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../api/client'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    if(token){
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      axios.get('/users/me').then(res=> setUser(res.data)).catch(()=>{
        localStorage.removeItem('accessToken')
      }).finally(()=>setLoading(false))
    } else {
      setLoading(false)
    }
  },[])

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password })
    const token = res.data.accessToken
    if(token){
      localStorage.setItem('accessToken', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      const me = await axios.get('/users/me')
      setUser(me.data)
    }
  }

  const signup = async (name, email, password) => {
    await axios.post('/auth/signup', { name, email, password })
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}

export default AuthContext
