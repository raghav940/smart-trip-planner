import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTrip, updateTrip, createTrip } from '../api/trips'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function TripForm(){
  const { id } = useParams()
  const isEdit = !!id
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isEdit){
      (async ()=>{
        setFetching(true)
        try{
          const data = await getTrip(id)
          setTitle(data.title || '')
          setStartDate(data.startDate || '')
          setEndDate(data.endDate || '')
        }catch(e){
          toast.error('Failed to load trip')
          navigate('/trips')
        }finally{
          setFetching(false)
        }
      })()
    }
  },[id])

  const submit = async (e) => {
    e.preventDefault()
    if(!title || !startDate || !endDate) {
      toast.error('Please fill in all fields')
      return
    }
    if(new Date(startDate) > new Date(endDate)) {
      toast.error('Start date must be before end date')
      return
    }
    setLoading(true)
    try{
      const payload = { title, startDate, endDate }
      if(isEdit) {
        await updateTrip(id, payload)
        toast.success('Trip updated!')
      } else {
        await createTrip(payload)
        toast.success('Trip created!')
      }
      navigate('/trips')
    }catch(e){
      const msg = e?.response?.data?.message || 'Failed to save trip'
      toast.error(msg)
    }finally{
      setLoading(false)
    }
  }

  if(fetching) return <div className="flex items-center gap-2"><Spinner /><span>Loading...</span></div>

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'New'} Trip</h2>
      <form onSubmit={submit} className="space-y-3">
        <input 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
          placeholder="Trip title" 
          disabled={loading}
          className="w-full p-2 border rounded disabled:opacity-50" 
        />
        <div className="flex gap-2">
          <div>
            <label className="text-sm text-gray-600">Start Date</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={e=>setStartDate(e.target.value)} 
              disabled={loading}
              className="p-2 border rounded disabled:opacity-50 w-full" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">End Date</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={e=>setEndDate(e.target.value)} 
              disabled={loading}
              className="p-2 border rounded disabled:opacity-50 w-full" 
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            disabled={loading}
            className="px-4 py-2 bg-sky-600 text-white rounded disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Spinner />}
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button 
            type="button"
            onClick={() => navigate('/trips')}
            disabled={loading}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
