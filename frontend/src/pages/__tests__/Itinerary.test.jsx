import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Itinerary from '../Itinerary'

const mockStore = configureStore([])

describe('Itinerary component (integration)', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      itinerary: {
        days: [
          { id: 1, date: '2026-05-15', notes: 'Day 1 notes' },
          { id: 2, date: '2026-05-16', notes: 'Day 2 notes' }
        ],
        status: 'succeeded',
        error: null
      }
    })
    store.dispatch = vi.fn()
  })

  it('renders itinerary days from store', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Itinerary />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('2026-05-15')).toBeInTheDocument()
    expect(screen.getByText('2026-05-16')).toBeInTheDocument()
    expect(screen.getByText('Day 1 notes')).toBeInTheDocument()
  })

  it('shows "no days" when empty', () => {
    const emptyStore = mockStore({
      itinerary: { days: [], status: 'succeeded', error: null }
    })
    emptyStore.dispatch = vi.fn()
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Itinerary />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('No itinerary days yet.')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    const loadingStore = mockStore({
      itinerary: { days: [], status: 'loading', error: null }
    })
    loadingStore.dispatch = vi.fn()
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Itinerary />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('Loading itinerary...')).toBeInTheDocument()
  })

  it('has add day button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Itinerary />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('Add Day')).toBeInTheDocument()
  })
})
