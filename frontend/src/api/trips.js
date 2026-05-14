import api from './client'

export const listTrips = async () => {
  const res = await api.get('/trips')
  return res.data
}

export const getTrip = async (tripId) => {
  const res = await api.get(`/trips/${tripId}`)
  return res.data
}

export const createTrip = async (payload) => {
  const res = await api.post('/trips', payload)
  return res.data
}

export const updateTrip = async (tripId, payload) => {
  const res = await api.put(`/trips/${tripId}`, payload)
  return res.data
}

export const deleteTrip = async (tripId) => {
  const res = await api.delete(`/trips/${tripId}`)
  return res.data
}
