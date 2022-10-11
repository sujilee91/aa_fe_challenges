import { useState, useEffect } from 'react'
import { URL, API_KEY } from '../const'
import moment from 'moment'
import { IconSet, WeatherDataType } from '../types'

type ListDataType = {
  clouds: { all: number }
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  }
  pop: number
  sys: { pod: string }
  visibility: number
  weather: Array<{
    description: string
    icon: IconSet
    id: number
    main: string
  }>
}

interface APIResponse {
  city: {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    population: number
    sunrise: number
    sunset: number
    timezone: -21600
  }
  cnt: number
  cod: string
  list: Array<ListDataType>
  message: number
}

const getURL = ({ lon, lat }) =>
  URL + `lat=${lat}&lon=${lon}` + '&cnd=32&units=metric&appid=' + API_KEY

/**
 * Because the API provides weather data for 5days every 3 hours,
 * When local time pass 9 p.m, will return next date data.
 * Means, if city data gets collected after 9pm, the top card will show the date rather than "Today"
 * */
const handleDataObject = (data: ListDataType) => {
  const weatherData = { ...data.weather[0] }
  const setDate = (timestamp: number, date: string) => {
    const timeDate = new Date(timestamp * 1000)
    const currentDate = new Date()

    return timeDate.toDateString() === currentDate.toDateString()
      ? 'Today'
      : moment(date).format('ddd')
  }

  return {
    date: setDate(data.dt, data.dt_txt),
    weather: weatherData.main,
    icon: weatherData.icon,
    temp: Math.round(data.main.temp),
  }
}

const handleFetchedData = (listdata: Array<ListDataType>) => {
  const dateObj: WeatherDataType = {
    current: null,
    future: [],
  }

  /**
   * The reason of `i = i+8`:
   * openweatherAPI provides weather data for 5 days, every 3 hours.
   * In order to make 5 weather card for 5 days, I need to selectively collect data every 24 hours from the first weather data.( 3 hours * 8 = 24hrs)
   * */

  for (let i = 0; i < listdata.length; i = i + 8) {
    if (i === 0) {
      dateObj.current = handleDataObject(listdata[i])
    } else {
      dateObj.future.push(handleDataObject(listdata[i]))
    }
  }

  return dateObj
}

export const useWeatherEffect = (selectedCity) => {
  const url = getURL(selectedCity)
  const [data, setData] = useState<WeatherDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch data Fail : ${response.status}`)
        }
        return response.json()
      })
      .then((actualData: APIResponse) => {
        setData(handleFetchedData(actualData.list))
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [selectedCity])

  return { data, loading, error }
}
