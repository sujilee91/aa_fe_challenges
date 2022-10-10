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

const handleDataObject = (data: ListDataType) => {
  const weatherData = { ...data.weather[0] }

  const DAY_TO_SECOUNDS = 28800

  const setDate = (timestamp: number, date: string) => {
    console.log(timestamp, 'ts')
    var sec = moment(new Date().valueOf()).utc().unix()

    return timestamp - sec <= DAY_TO_SECOUNDS
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

  for (let i = 0; i < listdata.length; i = i + 8) {
    if (i === 0) {
      console.log(listdata[i])
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log(response, 'res')
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
