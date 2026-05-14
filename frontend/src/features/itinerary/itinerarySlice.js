import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
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

      // addItineraryDay: optimistic push on pending
      .addCase(addItineraryDay.pending, (s, a) => {
        const temp = { id: `temp-${Date.now()}`, ...a.meta.arg.payload }
        s.days.push(temp)
      })
      .addCase(addItineraryDay.fulfilled, (s, a) => {
        s.days = s.days.map(d => d.id && String(d.id).startsWith('temp-') ? a.payload : d)
      })
      .addCase(addItineraryDay.rejected, (s, a) => {
        s.days = s.days.filter(d => !(d.id && String(d.id).startsWith('temp-')))
        s.error = a.error?.message
      })

      .addCase(editItineraryDay.fulfilled, (s, a)=> { s.days = s.days.map(d => d.id===a.payload.id ? a.payload : d) })
      .addCase(removeItineraryDay.pending, (s, a) => { s.days = s.days.filter(d => d.id !== a.meta.arg.dayId) })
      .addCase(removeItineraryDay.rejected, (s, a) => { s.error = a.error?.message })
  }
})

export const selectItineraryState = state => state.itinerary
export const selectItineraryDays = createSelector([selectItineraryState], s => s.days)

export default slice.reducer
