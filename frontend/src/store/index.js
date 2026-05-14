import { configureStore } from '@reduxjs/toolkit'
import tripsReducer from '../features/trips/tripsSlice'
import itineraryReducer from '../features/itinerary/itinerarySlice'

export default configureStore({
  reducer: {
    trips: tripsReducer,
    itinerary: itineraryReducer,
  }
})
