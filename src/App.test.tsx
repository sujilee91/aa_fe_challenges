import * as React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'
import { WeatherDataType } from './types'
import { DATA_MOCK } from './mocks'

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
  useFetchWeatherData: () => {
    return mock
  },
}))

describe('App render test', () => {
  const setState = jest.fn()
  const useStateMock: any = (initState: any) => [initState, setState]

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('initial render - renders City tabs', () => {
    render(<App />)
    const cityButtonElement = screen.getAllByRole('button')
    expect(cityButtonElement.length).toBe(3)
  })

  test('First city should initially be selected', () => {
    render(<App />)
    const firstCityElement = screen.getByTestId('Calgary')
    expect(firstCityElement).toHaveAttribute('class', `selected bold`)

    const cityButtonElement = screen.getAllByRole('button')
    expect(cityButtonElement.length).toBe(3)
  })

  test('Should change style if other city name clicked', async () => {
    render(<App />)

    const firstCityElement = screen.getByTestId('Calgary')
    expect(firstCityElement).toHaveAttribute('class', `selected bold`)

    const buttonElement = screen.getAllByRole('button')
    fireEvent.click(buttonElement[2])

    expect(buttonElement[2]).toHaveAttribute('class', `selected bold`)
  })

  test('selected city useState is called on selecting different city', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    render(<App />)

    const buttonElement = screen.getAllByRole('button')
    fireEvent.click(buttonElement[2])

    expect(setState).toHaveBeenCalledTimes(1)
  })

  test('selected city useState is not called on selecting same city', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    render(<App />)

    const buttonElement = screen.getAllByRole('button')
    fireEvent.click(buttonElement[0])

    expect(setState).toHaveBeenCalledTimes(0)
  })
})

describe('useWeaterEffect test', () => {
  test('Should show loading if in loading state', async () => {
    mock.loading = true
    render(<App />)
    const loadingElement = await screen.findByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  test('Should show error when useFetchWeatherData returns error', async () => {
    mock.loading = false
    mock.error = 'Fetch Failed'

    render(<App />)
    const errorElement = await screen.findByText('Error: Fetch Failed')
    expect(errorElement).toBeInTheDocument()
  })

  test('Should show data correctly when no error and not loading ', async () => {
    mock.loading = false
    mock.data = DATA_MOCK
    mock.error = null

    render(<App />)
    const dateElement = await screen.findByText('Today')
    const dateIconElement = await screen.findAllByRole('img')
    expect(dateElement).toBeInTheDocument()
    expect(dateIconElement.length).toBe(5)
  })

  test('Should show no data indication when no error and not loading', async () => {
    mock.loading = false
    mock.data = null
    mock.error = null

    render(<App />)
    const noDataElement = await screen.findByText('No Data!')
    expect(noDataElement).toBeInTheDocument()
  })
})
