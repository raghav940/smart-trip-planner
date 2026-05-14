import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listItineraryDays, createItineraryDay, updateItineraryDay, deleteItineraryDay } from '../api/itinerary'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItineraryDays, addItineraryDay, editItineraryDay, removeItineraryDay } from '../features/itinerary/itinerarySlice'

function DayForm({ initial = {}, onSave, onCancel }){
  const [date, setDate] = useState(initial.date || '')
  const [notes, setNotes] = useState(initial.notes || '')

  useEffect(()=>{
    setDate(initial.date || '')
    setNotes(initial.notes || '')
  },[initial])

  const submit = (e)=>{
    e.preventDefault()
    onSave({ date, notes })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 border rounded w-full" />
      <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="p-2 border rounded w-full" rows={4} />
      <div className="space-x-2">
        <button className="px-3 py-1 bg-sky-600 text-white rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </form>
  )
}

export default function Itinerary(){
  const { id } = useParams()
  const tripId = id
  const { days, status } = useSelector(state => state.itinerary)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{ dispatch(fetchItineraryDays(tripId)) },[dispatch, tripId])

  const handleCreate = async (payload)=>{
    await dispatch(addItineraryDay({ tripId, payload }))
    setCreating(false)
  }

  const handleUpdate = async (dayId, payload)=>{
    await dispatch(editItineraryDay({ tripId, dayId, payload }))
    setEditing(null)
  }

  const handleDelete = async (dayId)=>{
    if(!confirm('Delete this day?')) return
    await dispatch(removeItineraryDay({ tripId, dayId }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Itinerary</h2>
        <button onClick={()=>setCreating(true)} className="px-3 py-1 bg-sky-600 text-white rounded">Add Day</button>
      </div>

      {creating && <div className="mb-4 p-4 bg-white rounded shadow-sm"><DayForm onSave={handleCreate} onCancel={()=>setCreating(false)} /></div>}

      {status === 'loading' ? <div>Loading...</div> : (
        <div className="space-y-3">
          {(!days || days.length === 0) && <div className="text-gray-600">No itinerary days yet.</div>}
          {days && days.map(day=> (
            <div key={day.id} className="p-3 bg-white rounded shadow-sm">
              {editing === day.id ? (
                <DayForm initial={day} onSave={(p)=>handleUpdate(day.id,p)} onCancel={()=>setEditing(null)} />
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{day.date}</div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{day.notes}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={()=>setEditing(day.id)} className="text-sky-600">Edit</button>
                    <button onClick={()=>handleDelete(day.id)} className="text-red-600">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
