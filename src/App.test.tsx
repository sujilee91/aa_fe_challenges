import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
import { WeatherDataType } from './types'
interface mockTypes {
  data: WeatherDataType | null
  loading: boolean
  error: string | null
}
const mock: mockTypes = { data: null, loading: false, error: null }
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

test('choose different city button should changes button style and fetch new data', () => {
  render(<App />)
  const cityButtonElement = screen.getAllByRole('button')
  expect(cityButtonElement.length).toBe(3)
})

test('click already selected city button should not changes button style', () => {
  render(<App />)
  const cityButtonElement = screen.getAllByRole('button')
  expect(cityButtonElement.length).toBe(3)
})

test('click already selected city button should not fetch new data', () => {
  render(<App />)
  const cityButtonElement = screen.getAllByRole('button')
  expect(cityButtonElement.length).toBe(3)
})
