export const API_KEY = '04d9d11d7f2bcbc2b7dce18095755532'
export const URL = 'https://api.openweathermap.org/data/2.5/forecast?'

export const CITY_LIST = [
  {
    name: 'Ottawa',
    lon: -114.0853,
    lat: 51.0501,
  },
  {
    name: 'Moscow',
    lon: 126.9778,
    lat: 37.5683,
  },
  {
    name: 'Tokyo',
    lon: 11.5755,
    lat: 48.1374,
  },
]

export const ICON_SIZE = {
  xl: '270',
  lg: '200',
  md: '120',
  sm: '40',
}

export const ICON_COLOR = '#000052'

export const SCREEN_SIZE = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '2560px',
}

export const DEVICE = {
  mobile: `(min-width: ${SCREEN_SIZE.mobile}) and (max-width: ${SCREEN_SIZE.tablet})`,
  tablet: `(min-width: ${SCREEN_SIZE.tablet}) and (max-width: ${SCREEN_SIZE.laptop})`,
  laptop: `(min-width: ${SCREEN_SIZE.laptop}) and (max-width: ${SCREEN_SIZE.desktop})`,
  desktop: `(min-width: ${SCREEN_SIZE.desktop})`,
}

// Comment: dont forget to see if this ends up being used
export enum WEATHER_ICON {
  '01d' = 'sunny-1',
  '02d' = 'partly-cloudy-1',
  '03d' = 'clouds-1',
  '04d' = 'clouds-1',
  '09d' = 'light-rain-1',
  '10d' = 'light-rain-1',
  '11d' = 'thunderstorm-1',
  '13d' = 'snowflake-1',
  '50d' = 'fog-1',
  '01n' = 'half-moon-1',
  '02n' = 'night-cloudy-1',
  '03n' = 'clouds-1',
  '04n' = 'clouds-1',
  '09n' = 'light-rain-1',
  '10n' = 'night-light-rain-1',
  '11n' = 'thunderstorm-1',
  '13n' = 'snowflake-1',
  '50n' = 'fog-1',
}
