import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'
import { WeatherDataType } from './types'
import { data_mock } from './mocks'
import { useWeatherEffect } from './functions/fetchData'

interface mockTypes {
  data: WeatherDataType | null
  loading: boolean
  error: string | null
}

const mock: mockTypes = { data: null, loading: false, error: null }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock

jest.mock('./functions/fetchData', () => ({
  useWeatherEffect: () => {
    return mock
  },
}))

describe('initial render', () => {
  it('initial render - renders City tabs', () => {
    render(<App />)
    const cityButtonElement = screen.getAllByRole('button')
    expect(cityButtonElement.length).toBe(3)
  })
})

describe('useWeaterEffect render', () => {
  //loading
  test('Should show loading if in loading state', async () => {
    mock.loading = true
    render(<App />)
    const loadingElement = await screen.findByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  //error state
  test('Should show error if not useWeatherEffect returns error', async () => {
    mock.loading = false
    mock.error = 'Fetch Failed'

    render(<App />)
    const errorElement = await screen.findByText('Sorry! Fetch Failed')
    expect(errorElement).toBeInTheDocument()
  })

  //show data correctly
  test('Should show data correctly', async () => {
    mock.loading = false
    mock.data = data_mock
    mock.error = null

    render(<App />)
    const dateElement = await screen.findByText('Today')
    const dateIconElement = await screen.findAllByRole('img')
    expect(dateElement).toBeInTheDocument()
    expect(dateIconElement.length).toBe(5)
  })
})
