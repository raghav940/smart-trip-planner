import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTrip, getTrip, updateTrip } from '../api/trips'

export default function TripForm(){
  const { id } = useParams()
  const isEdit = !!id
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isEdit){
      (async ()=>{
        setLoading(true)
        const data = await getTrip(id)
        setTitle(data.title || '')
        setStartDate(data.startDate || '')
        setEndDate(data.endDate || '')
        setLoading(false)
      })()
    }
  },[id])

  const submit = async (e) => {
    e.preventDefault()
    try{
      const payload = { title, startDate, endDate }
      if(isEdit) await updateTrip(id, payload)
      else await createTrip(payload)
      navigate('/trips')
    }catch(e){
      console.error(e)
      alert('Failed to save')
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'New'} Trip</h2>
      {loading ? <div>Loading...</div> : (
        <form onSubmit={submit} className="space-y-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Trip title" className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="p-2 border rounded flex-1" />
            <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="p-2 border rounded flex-1" />
          </div>
          <div>
            <button className="px-4 py-2 bg-sky-600 text-white rounded">Save</button>
          </div>
        </form>
      )}
    </div>
  )
}
