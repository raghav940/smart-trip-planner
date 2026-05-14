import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrip } from '../api/trips'

export default function TripDetails(){
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      setLoading(true)
      try{
        const data = await getTrip(id)
        setTrip(data)
      }catch(e){console.error(e)}
      setLoading(false)
    })()
  },[id])

  if(loading) return <div>Loading...</div>
  if(!trip) return <div>Trip not found</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{trip.title || 'Untitled'}</h2>
      <div className="text-sm text-gray-600 mb-4">{trip.startDate} → {trip.endDate}</div>
      <div className="mb-4">
        <Link to={`/trips/${id}/edit`} className="text-sky-600">Edit trip</Link>
      </div>
      <div>
        <h3 className="font-semibold">Itinerary</h3>
        <div className="text-sm text-gray-600">Use itinerary pages to manage days (not implemented yet).</div>
      </div>
    </div>
  )
}
