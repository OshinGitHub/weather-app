import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import './App.css'
import MoreDetailWeather from './components/MoreDetailWeather'
import ShowWeather from './components/ShowWeather'

const API_KEY = '585f046188802385129041d8014ea549'
const URL = 'http://api.openweathermap.org/data/2.5'

function App() {
  const [searchText, setSearchText] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {}, [])

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchWeather = async (e) => {
    e.preventDefault()
    if (!searchText) return
    setIsLoading(true)
    try {
      await fetchWeather()
      setSearchText('')
      setErrMessage('')
    } catch (error) {
      console.error('Error❌:', error?.response?.data)
      setErrMessage(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
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
      {errMessage && (
        <div
          style={{
            display: 'flex'
          }}
        >
          <div
            style={{
              padding: '1.5rem',
              border: 'crimson 1px solid',
              borderRadius: '0.5rem',
              width: 225,
              margin: 'auto'
            }}
          >
            <p>{errMessage}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSearchWeather}>
        <input
          type="text"
          placeholder="Search area"
          value={searchText}
          onChange={handleChangeSearchText}
        />
        <button type="submit">Search</button>
      </form>

      {(weatherData || isLoading) && isLoading ? (
        <div style={{ height: '100%', width: '100%', color: 'lightcoral' }}>
          Loading...
        </div>
      ) : (
        !errMessage && (
          <Fragment>
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
          </Fragment>
        )
      )}
    </div>
  )
}

export default App
