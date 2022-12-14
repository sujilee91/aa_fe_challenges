import React from 'react'

import './style.less'

import WeatherIcon from './WeatherIcon'

import { WEATHER_ICON } from '../../const'
import { WeatherDataType } from '../../types'
import '../../styles.less'

interface WeatherCardProps {
  weatherData: WeatherDataType | null
  loading: boolean
  error: string | null
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  loading,
  error,
}) => {
  if (loading)
    return (
      <div className="wrapper">
        <div className="loader"> Loading...</div>
      </div>
    )

  if (error) {
    return (
      <div className="wrapper">
        <div className="error">
          Sorry!
          <br />
          <span>Error: {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      {weatherData ? (
        <>
          <div className="box today">
            <span className="date">{weatherData.current.date}</span>
            <div className="info-wrapper">
              <WeatherIcon id={WEATHER_ICON[weatherData.current.icon]} />
              <div>
                <div className="temp">
                  <span>{weatherData.current.temp}°</span>
                </div>
                <div className="text">{weatherData.current.weather}</div>
              </div>
            </div>
          </div>
          <div className="box future">
            {weatherData.future.map(({ date, temp, icon }, index) => {
              return (
                <div
                  className={`box future_col_${index + 1} future-info`}
                  key={index}
                >
                  <div className="future-date">{date}</div>
                  <WeatherIcon id={WEATHER_ICON[icon]} />
                  <div className="future-temp">{temp}°</div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div>No Data!</div>
      )}
    </div>
  )
}

export default WeatherCard
