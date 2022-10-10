export type IconSet =
  | '01d'
  | '02d'
  | '03d'
  | '04d'
  | '09d'
  | '10d'
  | '11d'
  | '13d'
  | '50d'
  | '01n'
  | '02n'
  | '03n'
  | '04n'
  | '09n'
  | '10n'
  | '11n'
  | '13n'
  | '50n'

export type IconName =
  | 'sunny-1'
  | 'partly-cloudy-1'
  | 'clouds-1'
  | 'light-rain-1'
  | 'thunderstorm-1'
  | 'snowflake-1'
  | 'fog-1'
  | 'half-moon-1'
  | 'night-cloudy-1'
  | 'night-light-rain-1'

interface DateSet {
  date: string
  weather: string
  icon: IconSet
  temp: number
}

export type WeatherDataType = {
  current: DateSet | null
  future: Array<DateSet>
}

export {}
