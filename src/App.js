import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import MoreDetailWeather from './components/MoreDetailWeather'
import ShowWeather from './components/ShowWeather'

const API_KEY = '585f046188802385129041d8014ea549'
const URL = 'http://api.openweathermap.org/data/2.5'

function App() {
  const [searchText, setSearchText] = useState('')
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {}, [])

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchWeather = (e) => {
    e.preventDefault()
    if (!searchText) return
    fetchWeather()
    setSearchText('')
  }

  async function fetchWeather() {
    const response = await axios.get(
      `${URL}/weather?q=${searchText}&units=metric&lang=us&appid=${API_KEY}`
    )
    console.log(response)
    setWeatherData(response.data)
  }

  const highLowTemp = `${Math.round(
    weatherData?.main?.temp_max
  )} / ${Math.round(weatherData?.main?.temp_min)}`

  const location = `${weatherData?.name}, ${weatherData?.sys?.country}`
  return (
    <div className="App">
      <form onSubmit={handleSearchWeather}>
        <input
          type="text"
          placeholder="Search area"
          value={searchText}
          onChange={handleChangeSearchText}
        />
        <button type="submit">Search</button>
      </form>
      <ShowWeather
        temp={weatherData?.main?.temp}
        cloudIcon={weatherData.weather?.[0]?.icon}
        location={location}
      />
      <MoreDetailWeather
        highLow={highLowTemp}
        humidity={weatherData?.main?.humidity}
        pressure={weatherData?.main?.pressure}
        visibility={weatherData?.visibility}
        wind={Math.round(weatherData?.wind?.gust)}
        windDirection={weatherData?.wind?.deg}
        sunriseTime={new Date(
          weatherData?.sys?.sunrise * 1000
        ).toLocaleTimeString()}
        sunsetTime={new Date(
          weatherData?.sys?.sunset * 1000
        ).toLocaleTimeString()}
      />
    </div>
  )
}

export default App
