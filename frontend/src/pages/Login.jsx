import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [error,setError]=useState(null)
 const navigate = useNavigate()
 const { login } = useAuth()
 const submit = async (e) => {
  e.preventDefault()
  setError(null)
  try{
    await login(email,password)
    navigate('/')
  }catch(err){
    setError(err?.response?.data?.message || 'Login failed')
  }
 }
 return (
  <div className="max-w-md">
    <h2 className="text-xl font-semibold mb-4">Login</h2>
    <form onSubmit={submit} className="space-y-3">
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
      {error && <div className="text-red-600">{error}</div>}
      <button className="px-4 py-2 bg-sky-600 text-white rounded">Login</button>
    </form>
  </div>
 )
}
