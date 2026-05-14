import { describe, it, expect } from 'vitest'
import tripsReducer, { fetchTrips, createNewTrip, removeTrip, selectAllTrips } from '../tripsSlice'

describe('trips slice reducer (unit)', ()=>{
  const initialState = { items: [{id:1,title:'A'} , {id:2,title:'B'}], status:'idle', error:null }

  it('handles removeTrip pending (optimistic delete)', ()=>{
    const action = removeTrip.pending('', 2)
    const state = tripsReducer(initialState, action)
    expect(state.items.find(t=>t.id===2)).toBeUndefined()
  })

  it('restores error on removeTrip.rejected', ()=>{
    const pending = removeTrip.pending('', 2)
    const afterPending = tripsReducer(initialState, pending)
    const rejected = removeTrip.rejected({ message: 'fail' }, '', 2)
    const afterRejected = tripsReducer(afterPending, rejected)
    expect(afterRejected.error).toBeDefined()
  })

  it('adds temp item on createNewTrip.pending and replaces on fulfilled', ()=>{
    const payload = { title: 'New' }
    const pending = createNewTrip.pending(payload, payload)
    const stateAfterPending = tripsReducer(initialState, pending)
    expect(stateAfterPending.items.some(i=>String(i.id).startsWith('temp-'))).toBe(true)

    const fulfilled = createNewTrip.fulfilled({ id: 99, title: 'New' }, '', payload)
    const stateAfterFulfilled = tripsReducer(stateAfterPending, fulfilled)
    expect(stateAfterFulfilled.items.some(i=>i.id===99)).toBe(true)
  })
})
