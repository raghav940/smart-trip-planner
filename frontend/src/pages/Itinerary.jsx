import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItineraryDays, addItineraryDay, editItineraryDay, removeItineraryDay } from '../features/itinerary/itinerarySlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function DayForm({ initial = {}, onSave, onCancel }){
  const [date, setDate] = useState(initial.date || '')
  const [notes, setNotes] = useState(initial.notes || '')
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    setDate(initial.date || '')
    setNotes(initial.notes || '')
  },[initial])

  const submit = async (e)=>{
    e.preventDefault()
    if(!date) {
      toast.error('Date is required')
      return
    }
    setSaving(true)
    try{
      await onSave({ date, notes })
    }catch(err){
      toast.error('Failed to save day')
    }finally{
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input 
        type="date" 
        value={date} 
        onChange={e=>setDate(e.target.value)} 
        disabled={saving}
        className="p-2 border rounded w-full disabled:opacity-50" 
      />
      <textarea 
        value={notes} 
        onChange={e=>setNotes(e.target.value)} 
        placeholder="Notes" 
        disabled={saving}
        className="p-2 border rounded w-full disabled:opacity-50" 
        rows={4} 
      />
      <div className="space-x-2">
        <button disabled={saving} className="px-3 py-1 bg-sky-600 text-white rounded disabled:opacity-50 flex items-center gap-2">
          {saving && <Spinner />}
          Save
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          disabled={saving}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Cancel
        </button>
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
    try{
      await dispatch(addItineraryDay({ tripId, payload }))
      setCreating(false)
      toast.success('Day added!')
    }catch(err){
      toast.error('Failed to add day')
    }
  }

  const handleUpdate = async (dayId, payload)=>{
    try{
      await dispatch(editItineraryDay({ tripId, dayId, payload }))
      setEditing(null)
      toast.success('Day updated!')
    }catch(err){
      toast.error('Failed to update day')
    }
  }

  const handleDelete = async (dayId)=>{
    if(!confirm('Delete this day?')) return
    try{
      await dispatch(removeItineraryDay({ tripId, dayId }))
      toast.success('Day deleted!')
    }catch(err){
      toast.error('Failed to delete day')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Itinerary</h2>
        <button 
          onClick={()=>setCreating(true)} 
          disabled={creating}
          className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50"
        >
          Add Day
        </button>
      </div>

      {creating && <div className="mb-4 p-4 bg-white rounded shadow-sm"><DayForm onSave={handleCreate} onCancel={()=>setCreating(false)} /></div>}

      {status === 'loading' ? (
        <div className="flex items-center gap-2 justify-center py-10">
          <Spinner />
          <span>Loading itinerary...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {(!days || days.length === 0) && <div className="text-gray-600 text-center py-10">No itinerary days yet.</div>}
          {days && days.map(day=> (
            <div key={day.id} className="p-4 bg-white rounded shadow-sm hover:shadow-md transition">
              {editing === day.id ? (
                <DayForm initial={day} onSave={(p)=>handleUpdate(day.id,p)} onCancel={()=>setEditing(null)} />
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sky-600">{day.date}</div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{day.notes}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={()=>setEditing(day.id)} className="text-sm text-sky-600 hover:underline">Edit</button>
                    <button onClick={()=>handleDelete(day.id)} className="text-sm text-red-600 hover:underline">Delete</button>
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
