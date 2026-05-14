import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Trips from '../Trips'

const mockStore = configureStore([])

describe('Trips component (integration)', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      trips: {
        items: [
          { id: 1, title: 'Trip A', startDate: '2026-05-15', endDate: '2026-05-20' },
          { id: 2, title: 'Trip B', startDate: '2026-05-22', endDate: '2026-05-25' }
        ],
        status: 'succeeded',
        error: null
      }
    })
    store.dispatch = vi.fn()
  })

  it('renders trip list from store', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('Trip A')).toBeInTheDocument()
    expect(screen.getByText('Trip B')).toBeInTheDocument()
  })

  it('shows "no trips" when items empty', () => {
    const emptyStore = mockStore({
      trips: { items: [], status: 'succeeded', error: null }
    })
    emptyStore.dispatch = vi.fn()
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText(/No trips yet/i)).toBeInTheDocument()
  })

  it('shows loading when status is loading', () => {
    const loadingStore = mockStore({
      trips: { items: [], status: 'loading', error: null }
    })
    loadingStore.dispatch = vi.fn()
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText('Loading trips...')).toBeInTheDocument()
  })
})
