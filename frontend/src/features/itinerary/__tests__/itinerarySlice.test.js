import { describe, it, expect } from 'vitest'
import itineraryReducer, { fetchItineraryDays, addItineraryDay, removeItineraryDay } from '../itinerarySlice'

describe('itinerary slice reducer (unit)', ()=>{
  const initialState = { days: [{id:1,date:'2026-05-14',notes:'Day 1'},{id:2,date:'2026-05-15',notes:'Day 2'}], status:'idle', error:null }

  it('adds temp day on addItineraryDay.pending', ()=>{
    const payload = { tripId: 'trip1', payload: {date:'2026-05-16', notes:'New'} }
    const action = addItineraryDay.pending(payload, payload)
    const state = itineraryReducer(initialState, action)
    expect(state.days.some(d => String(d.id).startsWith('temp-'))).toBe(true)
  })

  it('replaces temp item on addItineraryDay.fulfilled', ()=>{
    const payload = { tripId: 'trip1', payload: {date:'2026-05-16', notes:'New'} }
    const pending = addItineraryDay.pending(payload, payload)
    const afterPending = itineraryReducer(initialState, pending)
    const fulfilled = addItineraryDay.fulfilled({id:99,date:'2026-05-16',notes:'New'}, '', payload)
    const state = itineraryReducer(afterPending, fulfilled)
    expect(state.days.find(d=>d.id===99)).toBeDefined()
    expect(state.days.some(d => String(d.id).startsWith('temp-'))).toBe(false)
  })

  it('removes temp on addItineraryDay.rejected', ()=>{
    const payload = { tripId: 'trip1', payload: {date:'2026-05-16', notes:'New'} }
    const pending = addItineraryDay.pending(payload, payload)
    const afterPending = itineraryReducer(initialState, pending)
    expect(afterPending.days.some(d => String(d.id).startsWith('temp-'))).toBe(true)
    const rejected = addItineraryDay.rejected({ message: 'fail' }, '', payload)
    const state = itineraryReducer(afterPending, rejected)
    expect(state.days.some(d => String(d.id).startsWith('temp-'))).toBe(false)
    expect(state.error).toBeDefined()
  })

  it('removes day on removeItineraryDay.pending', ()=>{
    const action = removeItineraryDay.pending(null, { tripId: 'trip1', dayId: 1 })
    const state = itineraryReducer(initialState, action)
    expect(state.days.find(d=>d.id===1)).toBeUndefined()
  })
})
