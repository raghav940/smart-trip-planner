import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import * as api from '../../api/trips'

export const fetchTrips = createAsyncThunk('trips/fetchAll', async () => {
  return await api.listTrips()
})

export const createNewTrip = createAsyncThunk('trips/create', async (payload) => {
  return await api.createTrip(payload)
})

export const removeTrip = createAsyncThunk('trips/remove', async (tripId) => {
  return await api.deleteTrip(tripId)
})

const tripsSlice = createSlice({
  name: 'trips',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTrips.pending, (state) => { state.status = 'loading' })
      .addCase(fetchTrips.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchTrips.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })

      // createNewTrip: optimistic push with temp id on pending, replace on fulfilled, remove on rejected
      .addCase(createNewTrip.pending, (state, action) => {
        const temp = { id: `temp-${Date.now()}`, ...action.meta.arg }
        state.items.push(temp)
      })
      .addCase(createNewTrip.fulfilled, (state, action) => {
        // replace any temp item (best-effort) with returned payload
        state.items = state.items.map(i => i.id && String(i.id).startsWith('temp-') ? action.payload : i)
      })
      .addCase(createNewTrip.rejected, (state, action) => {
        // remove the temp item on failure
        state.items = state.items.filter(i => !(i.id && String(i.id).startsWith('temp-')))
        state.error = action.error?.message
      })

      // removeTrip: optimistic removal on pending, restore on rejected
      .addCase(removeTrip.pending, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.meta.arg)
      })
      .addCase(removeTrip.fulfilled, (state, action) => {
        // server confirmed deletion; nothing to do (already removed)
      })
      .addCase(removeTrip.rejected, (state, action) => {
        // optimistic deletion failed; record error (caller may re-fetch)
        state.error = action.error?.message
      })
  }
})

// Selectors
export const selectTripsState = state => state.trips
export const selectAllTrips = createSelector([selectTripsState], s => s.items)
export const selectTripById = (tripId) => createSelector([selectAllTrips], items => items.find(t => String(t.id) === String(tripId)))

export default tripsSlice.reducer
