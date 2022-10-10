import { WeatherDataType } from '../../types'

export type WeatherCardProps = {
  weatherData: WeatherDataType | null
  loading: boolean
  error: string | null
}
