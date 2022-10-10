import React, { useState } from 'react'
import { CITY_LIST } from './const'
import { CityTab, WeatherCard } from './Components'
import { useWeatherEffect } from './functions/fetchData'
import './styles.less'
import { ReactComponent as WeatherSVGs } from './assets/weathers.svg'

const App: React.FC = (): JSX.Element => {
  const [selectedCity, setSelectedCity] = useState(CITY_LIST[0])
  const { data, loading, error } = useWeatherEffect(selectedCity)

  return (
    <div className="main">
      <WeatherSVGs />
      <CityTab selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <WeatherCard weatherData={data} />
    </div>
  )
}

export default App
