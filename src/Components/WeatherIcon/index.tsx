import React from 'react'
import { IconName } from '../../types'

// Comment: You have incosistant defs of your component types, some are in types.ts, some are here, be consistant, donest matter which one

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
