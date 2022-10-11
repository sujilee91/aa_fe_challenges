import { WeatherDataType } from './types'

export const data_mock: WeatherDataType = {
  current: {
    date: 'Today',
    weather: 'Rain',
    icon: '10n',
    temp: 15,
  },
  future: [
    {
      date: 'Wed',
      weather: 'Clear',
      icon: '01n',
      temp: 11,
    },
    {
      date: 'Thu',
      weather: 'Rain',
      icon: '10n',
      temp: 12,
    },
    {
      date: 'Fri',
      weather: 'Clouds',
      icon: '04n',
      temp: 12,
    },
    {
      date: 'Sat',
      weather: 'Rain',
      icon: '10n',
      temp: 12,
    },
  ],
}
