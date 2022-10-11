import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import WeatherCard from './CityTab'

import { CITY_LIST } from '../../const'
import { SelectedCity } from '../../types'

const renderComponent = (
  mockSelected: SelectedCity,
  mockSetSelected: () => {},
) => {
  return render(
    <WeatherCard
      selectedCity={mockSelected}
      setSelectedCity={mockSetSelected}
    />,
  )
}

describe('CityTab Unit Test', () => {
  test('Should call setSelected if other city name clicked', async () => {
    const setSelected = jest.fn()
    renderComponent(CITY_LIST[0], setSelected)

    const buttonElements = screen.getAllByRole('button')
    fireEvent.click(buttonElements[2])

    expect(setSelected).toHaveBeenCalledTimes(1)
  })

  test('Should not call setSelected if currently selected city is clicked', async () => {
    const setSelected = jest.fn()
    renderComponent(CITY_LIST[0], setSelected)

    const secondButtonElement = screen.getAllByRole('button')
    fireEvent.click(secondButtonElement[0])

    expect(setSelected).toHaveBeenCalledTimes(0)
  })

  test('Should show city names in uppercase', async () => {
    const setSelected = jest.fn()
    renderComponent(CITY_LIST[0], setSelected)

    const calgaryElement = screen.getByText('CALGARY')
    const seoulElement = screen.getByText('SEOUL')
    const munichElement = screen.getByText('MUNICH')

    expect(calgaryElement).toBeInTheDocument()
    expect(seoulElement).toBeInTheDocument()
    expect(seoulElement).toBeInTheDocument()
  })
})
