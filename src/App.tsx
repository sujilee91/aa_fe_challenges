import React, { useState } from 'react'

import { ReactComponent as WeatherSVGs } from './Asstes/weathers.svg'
import { CityTab, WeatherCard } from './Components'
import { CITY_LIST } from './const'
import { useWeatherEffect } from './functions/fetchData'
import './styles.less'

const App: React.FC = (): JSX.Element => {
  const [selectedCity, setSelectedCity] = useState(CITY_LIST[0])
  const { data, loading, error } = useWeatherEffect(selectedCity)

  return (
    <div className="main">
      <WeatherSVGs />
      <CityTab selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <WeatherCard weatherData={data} loading={loading} error={error} />
    </div>
  )
}

export default App
