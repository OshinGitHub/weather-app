const ShowWeather = (props) => {
  const { temp, cloudIcon, location } = props
  return (
    <div>
      <div>Temp: {temp}</div>
      <br />
      <div>
        <img
          alt=""
          src={`http://openweathermap.org/img/wn/${cloudIcon}@2x.png`}
        />
      </div>
      <br />
      <div>Clouds as of {new Date().toLocaleTimeString()}</div>
      <div>{location}</div>
    </div>
  )
}

export default ShowWeather
