const MoreDetailWeather = ({
  highLow,
  humidity,
  pressure,
  visibility,
  wind,
  windDirection,
  sunriseTime,
  sunsetTime
}) => {
  return (
    <div>
      <div>High/Low: {highLow}</div>
      <br />
      <div>Humidity: {humidity} %</div>
      <br />
      <div>Pressure: {pressure} hPa</div>
      <br />
      <div>Visibility: {visibility / 1000} Km</div>
      <br />
      <br />
      <div>Wind: {wind} km/hr</div>
      <br />
      <div>Wind Direction: {windDirection}o deg</div>
      <br />
      <div>Sunrise: {sunriseTime} </div>
      <br />
      <div>Sunset {sunsetTime}</div>
    </div>
  )
}

export default MoreDetailWeather
