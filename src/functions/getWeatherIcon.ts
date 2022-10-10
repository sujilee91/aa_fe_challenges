import { IconSet } from '../types'
import { WEATHER_ICON } from '../const'

//Based on the list of icon from api:  https://openweathermap.org/weather-conditions
export const getWeatherIcon = (icon: IconSet) => {
  return WEATHER_ICON[icon]
}
