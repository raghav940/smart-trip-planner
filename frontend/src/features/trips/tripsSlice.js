import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
      .addCase(createNewTrip.fulfilled, (state, action) => { state.items.push(action.payload) })
      .addCase(removeTrip.fulfilled, (state, action) => { state.items = state.items.filter(t=>t.id !== action.meta.arg) })
  }
})

export default tripsSlice.reducer
