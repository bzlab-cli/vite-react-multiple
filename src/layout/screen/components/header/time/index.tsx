import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import tempIcon from '@/assets/images/screen/weather/temp.png'
import clearIcon from '@/assets/images/screen/weather/clear.png'
import rainIcon from '@/assets/images/screen/weather/rain.png'
import thunderstormIcon from '@/assets/images/screen/weather/thunderstorm.png'
import thunderIcon from '@/assets/images/screen/weather/thunder.png'
import cloudyIcon from '@/assets/images/screen/weather/cloudy.png'

const Time = () => {
  const timer = useRef() as any
  const [date, setDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [temp, setTemp] = useState<string>()
  const [weatherIcon, setWeatherIcon] = useState<string>()
  const weatherUrl = '/v3/weather/weatherInfo?city=浙江&key=0b4cabcd32ae9fd5fad69f501b0ef513&extensions=base'

  const onLoad = () => {
    const timeHandler = () => {
      const date = dayjs().format('YYYY/MM/DD')
      const time = dayjs().format('HH:mm:ss')
      setDate(date)
      setTime(time)
    }
    timer.current = setInterval(timeHandler, 1000)
    getWeather()
  }

  async function getWeather() {
    const { data } = await axios.get(weatherUrl)
    const info = data?.lives?.[0]
    const icon = getWeatherIcon(info?.weather)
    setTemp(info?.temperature)
    setWeatherIcon(icon)
  }

  function getWeatherIcon(val) {
    switch (val) {
      case '晴':
        return clearIcon
      case '雨':
        return rainIcon
      case '强雷阵雨':
        return thunderstormIcon
      case '雷阵雨':
        return thunderIcon
      default:
        return cloudyIcon
    }
  }

  useEffect(() => {
    onLoad()
    return () => {
      timer.current && clearInterval(timer.current)
    }
  }, [])

  return (
    <div className="time-container">
      <div className="date-box">
        <div className="time">{time}</div>
        <div className="date">{date}</div>
      </div>
      <div className="split-line" />
      <div className="weather-box">
        <img src={weatherIcon} className="weather-icon" />
        <img src={tempIcon} className="temp-icon" />
        <span className="temp-number">{temp}°C</span>
      </div>
    </div>
  )
}

export default Time
