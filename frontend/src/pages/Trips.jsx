import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrips, removeTrip } from '../features/trips/tripsSlice'

export default function Trips(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const trips = useSelector(state => state.trips.items)
  const status = useSelector(state => state.trips.status)

  useEffect(()=>{ if(status==='idle') dispatch(fetchTrips()) }, [dispatch, status])

  const handleDelete = async (id) => {
    if(!confirm('Delete this trip?')) return
    dispatch(removeTrip(id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Trips</h2>
        <button onClick={()=>navigate('/trips/new')} className="px-3 py-1 bg-sky-600 text-white rounded">New Trip</button>
      </div>
      {status === 'loading' ? <div>Loading...</div> : (
        <div className="space-y-3">
          {trips.length === 0 && <div className="text-gray-600">No trips yet.</div>}
          {trips.map(t=> (
            <div key={t.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
              <div>
                <Link to={`/trips/${t.id}`} className="font-semibold text-sky-600">{t.title || 'Untitled Trip'}</Link>
                <div className="text-sm text-gray-600">{t.startDate} → {t.endDate}</div>
              </div>
              <div className="space-x-2">
                <button onClick={()=>navigate(`/trips/${t.id}/edit`)} className="text-sm text-sky-600">Edit</button>
                <button onClick={()=>handleDelete(t.id)} className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
