import React from 'react'

import './style.less'
import { CITY_LIST } from '../../const'
import { SelectedCity } from '../../types'

interface CityTabProps {
  selectedCity: SelectedCity
  setSelectedCity: (selectedCity: SelectedCity) => void
}

const CityTab: React.FC<CityTabProps> = ({ selectedCity, setSelectedCity }) => {
  const isSelectedCity = (name: string) => name === selectedCity.name

  return (
    <div className="tab-wrapper">
      {CITY_LIST.map((city) => (
        <button
          key={city.name}
          onClick={() =>
            isSelectedCity(city.name) ? null : setSelectedCity(city)
          }
          className={`${
            isSelectedCity(city.name) ? 'selected bold' : 'text light'
          }`}
          data-testid={city.name}
        >
          {city.name.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default CityTab
