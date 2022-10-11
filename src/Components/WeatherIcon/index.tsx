import React from 'react'
import { IconName } from '../../types'

type WeatherIconProps = {
  id: IconName
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ id }) => {
  return (
    <div className="icon-container">
      <svg>
        <use href={`#${id}`}></use>
      </svg>
    </div>
  )
}
