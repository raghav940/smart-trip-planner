import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/itinerary'

export const fetchItineraryDays = createAsyncThunk('itinerary/fetchDays', async (tripId) => {
  return await api.listItineraryDays(tripId)
})

export const addItineraryDay = createAsyncThunk('itinerary/addDay', async ({tripId, payload}) => {
  return await api.createItineraryDay(tripId, payload)
})

export const editItineraryDay = createAsyncThunk('itinerary/editDay', async ({tripId, dayId, payload}) => {
  return await api.updateItineraryDay(tripId, dayId, payload)
})

export const removeItineraryDay = createAsyncThunk('itinerary/removeDay', async ({tripId, dayId}) => {
  return await api.deleteItineraryDay(tripId, dayId)
})

const slice = createSlice({
  name: 'itinerary',
  initialState: { days: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItineraryDays.pending, (s)=> { s.status = 'loading' })
      .addCase(fetchItineraryDays.fulfilled, (s, a)=> { s.status='succeeded'; s.days = a.payload })
      .addCase(fetchItineraryDays.rejected, (s, a)=> { s.status='failed'; s.error = a.error.message })
      .addCase(addItineraryDay.fulfilled, (s, a)=> { s.days.push(a.payload) })
      .addCase(editItineraryDay.fulfilled, (s, a)=> { s.days = s.days.map(d => d.id===a.payload.id ? a.payload : d) })
      .addCase(removeItineraryDay.fulfilled, (s, a)=> { /* optimistic removal handled by caller */ })
  }
})

export default slice.reducer
