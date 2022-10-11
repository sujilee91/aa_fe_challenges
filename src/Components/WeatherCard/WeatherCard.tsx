import React from 'react'
import './style.less'
import '../../styles.less'
import { WEATHER_ICON } from '../../const'
import { WeatherIcon } from '../WeatherIcon'
import { WeatherDataType } from '../../types'

interface WeatherCardProps {
  weatherData: WeatherDataType | null
  loading: boolean
  error: string | null
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  loading,
  error = 'Something went wrong!',
}) => {
  if (loading)
    return (
      <div className="wrapper">
        <div className="loader"> Loading...</div>
      </div>
    )

  if (error || (weatherData === null && !loading)) {
    return <div className="error"> Sorry! {error}</div>
  }

  return (
    <div className="wrapper">
      {weatherData?.current ? (
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
      ) : null}
    </div>
  )
}

export default WeatherCard
