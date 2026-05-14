import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function Signup(){
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [name,setName]=useState('')
 const [loading, setLoading]=useState(false)
 const navigate = useNavigate()
 const { signup } = useAuth()
 
 const submit = async (e) => {
  e.preventDefault()
  if(!name || !email || !password) {
    toast.error('Please fill in all fields')
    return
  }
  setLoading(true)
  try{
    await signup(name,email,password)
    toast.success('Account created! Redirecting to login...')
    navigate('/login')
  }catch(err){
    const msg = err?.response?.data?.message || err.message || 'Signup failed'
    toast.error(msg)
  }finally{
    setLoading(false)
  }
 }
 
 return (
  <div className="max-w-md">
    <h2 className="text-2xl font-bold mb-6">Create Account</h2>
    <form onSubmit={submit} className="space-y-4">
      <input 
        value={name} 
        onChange={e=>setName(e.target.value)} 
        placeholder="Full name" 
        disabled={loading}
        className="w-full p-2 border rounded disabled:opacity-50" 
      />
      <input 
        value={email} 
        onChange={e=>setEmail(e.target.value)} 
        placeholder="Email" 
        type="email"
        disabled={loading}
        className="w-full p-2 border rounded disabled:opacity-50" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e=>setPassword(e.target.value)} 
        placeholder="Password" 
        disabled={loading}
        className="w-full p-2 border rounded disabled:opacity-50" 
      />
      <button 
        disabled={loading}
        className="w-full px-4 py-2 bg-sky-600 text-white rounded disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading && <Spinner />}
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
    <div className="mt-4 text-sm">
      Already have an account? <Link to="/login" className="text-sky-600 font-semibold">Log in</Link>
    </div>
  </div>
 )
}
