import React from 'react'

import { CityTabProps } from './types'
import { CITY_LIST } from '../../const'
import './style.less'

// Comment: whats this for
enum CityNames {
  'Ottawa',
  'Tokyo',
  'Moscow',
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
        >
          {city.name.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default CityTab
