import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrips, removeTrip } from '../features/trips/tripsSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function Trips(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const trips = useSelector(state => state.trips.items)
  const status = useSelector(state => state.trips.status)
  const error = useSelector(state => state.trips.error)

  useEffect(()=>{ if(status==='idle') dispatch(fetchTrips()) }, [dispatch, status])

  useEffect(()=>{
    if(error) toast.error(`Error: ${error}`)
  }, [error])

  const handleDelete = async (id) => {
    if(!confirm('Delete this trip?')) return
    dispatch(removeTrip(id))
    toast.success('Trip deleted!')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Trips</h2>
        <button onClick={()=>navigate('/trips/new')} className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700">New Trip</button>
      </div>
      {status === 'loading' ? (
        <div className="flex items-center gap-2 justify-center py-10">
          <Spinner />
          <span>Loading trips...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.length === 0 && <div className="text-gray-600 text-center py-10">No trips yet. <Link to="/trips/new" className="text-sky-600 font-semibold">Create one!</Link></div>}
          {trips.map(t=> (
            <div key={t.id} className="p-4 bg-white rounded shadow-sm hover:shadow-md transition flex justify-between items-center">
              <div>
                <Link to={`/trips/${t.id}`} className="font-semibold text-sky-600 hover:underline">{t.title || 'Untitled Trip'}</Link>
                <div className="text-sm text-gray-600">{t.startDate} → {t.endDate}</div>
              </div>
              <div className="space-x-2">
                <button onClick={()=>navigate(`/trips/${t.id}/edit`)} className="text-sm text-sky-600 hover:underline">Edit</button>
                <button onClick={()=>handleDelete(t.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
