import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Trips from './pages/Trips'
import TripForm from './pages/TripForm'
import TripDetails from './pages/TripDetails'
import Itinerary from './pages/Itinerary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Header(){
  const { user, logout } = useAuth()
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Smart Trip Planner</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-sky-600 hover:underline">Home</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button onClick={logout} className="text-sky-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sky-600 hover:underline">Login</Link>
              <Link to="/signup" className="text-sky-600 hover:underline">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function App(){
 return (
  <AuthProvider>
  <div className="min-h-screen bg-gray-50">
   <Header />
   <main className="max-w-4xl mx-auto p-4">
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/signup" element={<Signup/>} />
       <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
       <Route path="/trips/new" element={<ProtectedRoute><TripForm /></ProtectedRoute>} />
       <Route path="/trips/:id" element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
       <Route path="/trips/:id/edit" element={<ProtectedRoute><TripForm /></ProtectedRoute>} />
       <Route path="/trips/:id/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
     </Routes>
   </main>
  </div>
  <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  </AuthProvider>
 )
}
