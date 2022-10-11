import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import WeatherCard from './WeatherCard'
import { data_mock } from '../../mocks'
import { WeatherDataType } from '../../types'
const renderComponent = (
  mockWeatherData: WeatherDataType | null,
  mockLoading: boolean,
  mockError: string | null,
) => {
  return render(
    <WeatherCard
      weatherData={mockWeatherData}
      loading={mockLoading}
      error={mockError}
    />,
  )
}

describe('WeatherCard Unit Test', () => {
  test('Should show loading if in loading state without data', async () => {
    renderComponent(null, true, null)
    const loadingElement = await screen.findByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  test('Should show loading if in loading state with data', async () => {
    renderComponent(data_mock, true, null)
    const loadingElement = await screen.findByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  test('Should show error if in error state with data', async () => {
    renderComponent(data_mock, false, 'Fetch failed')
    const errorElement = await screen.findByText('Error: Fetch failed')
    expect(errorElement).toBeInTheDocument()
  })

  test('Should show data with no loading and no error', async () => {
    renderComponent(data_mock, false, null)
    const dataElement = await screen.findByText('Today')
    expect(dataElement).toBeInTheDocument()
  })

  test('Should show no data indication with no loading and no error', async () => {
    renderComponent(null, false, null)
    const noDataElement = await screen.findByText('No Data!')
    expect(noDataElement).toBeInTheDocument()
  })
})
