import React from 'react'
import './style.less'
import '../../styles.less'
import { WEATHER_ICON } from '../../const'
import { WeatherIcon } from '../WeatherIcon'
import { WeatherCardProps } from './types'

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  if (weatherData === null) return null

  return (
    <div className="wrapper">
      {/*Comment: I thnk you can remove this check caue of line 10*/}
      {weatherData.current ? (
        <>
          <div className="box today">
            <span className="date">{weatherData.current.date}</span>
            <div className="info-wrapper">
              <WeatherIcon id={WEATHER_ICON[weatherData.current.icon]} />
              <div>
                <div className="temp">
                  {/* <span>{weatherData.current.temp}°</span> */}
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
                  <div className="text future-date">{date}</div>
                  <WeatherIcon id={WEATHER_ICON[icon]} />
                </div>
              )
            })}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default WeatherCard
