import api from './client'

export const listItineraryDays = async (tripId) => {
  const res = await api.get(`/trips/${tripId}/itinerary/days`)
  return res.data
}

export const createItineraryDay = async (tripId, payload) => {
  const res = await api.post(`/trips/${tripId}/itinerary/days`, payload)
  return res.data
}

export const updateItineraryDay = async (tripId, dayId, payload) => {
  const res = await api.put(`/trips/${tripId}/itinerary/days/${dayId}`, payload)
  return res.data
}

export const deleteItineraryDay = async (tripId, dayId) => {
  const res = await api.delete(`/trips/${tripId}/itinerary/days/${dayId}`)
  return res.data
}
