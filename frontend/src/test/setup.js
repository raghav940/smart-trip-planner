
import { vi } from 'vitest'
import React from 'react'
import '@testing-library/jest-dom'

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  ToastContainer: () => React.createElement('div'),
}))

// Mock Spinner component
vi.mock('../components/Spinner', () => ({
  default: () => React.createElement('div', { 'data-testid': 'spinner' }, 'Loading...'),
}))
