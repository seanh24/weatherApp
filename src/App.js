import { useEffect, useState } from 'react';
import './App.css';
import Current from './Current';
import DailyForecast from './DailyForecast';
import Hourly from './Hourly';
import { FaSearch } from 'react-icons/fa'
import cloudy from './cloudy.jpg'


function App() {
  const [city, setCity] = useState('Jacksonville Beach')
  const [units, setUnits] = useState('F')
  const [currentData, setCurrentData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [location, setLocation] = useState(null)
  const [fetched, setFetched] = useState(false)

  let newCity;
  const handleInput = (e) => {
    newCity = e.target.value
  }

  const handleSubmit = () => {
    setCity(newCity)
  }

  const handleUnits = (e) => {
    if (e.target.value === 'f') {
      setUnits('F')
    } 
    else if (e.target.value === 'c') {
      setUnits('C')
    }
  }

  useEffect( () => {
    const apiKey = process.env.API_KEY
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=no&alerts=no`
    fetch(url)
        .then(resp => {return resp.json()})
        .then(data => {
            setCurrentData(data.current)
            setForecastData(data.forecast)
            setLocation(data.location)
            console.log('fetch')
        })
        .then(() => {setFetched(true)})
        .catch(() => console.err)
    },[city])
    
    const backGround = {
      backgroundImage: `url(${cloudy})`,
      backgroundSize: '100vw'
    }
    

  return (
    <div className="App" style={backGround} >

      <div className='main'>

        <div className='nav'>
          <input type="text" name="city" id="city" onChange={handleInput} />
          <p><button name='f' value='f' className='unitF'onClick={handleUnits}>F</button> / 
          <button name='c' value='c' className='unitC' onClick={handleUnits}>C</button></p>
          <button onClick={handleSubmit}><FaSearch /></button>
        </div>
          
        {fetched && <Current data={currentData} units={units} location={location} />}

        <div className="day">
          <h3>3 Day Forecast</h3>
          <div className="tile-cont">
            {fetched && [0,1,2].map((day,index) => {return <DailyForecast day={day} data={forecastData} units={units} key={index}/>})}
          </div>
        </div>
       
      </div>

      <div className='hourly'>
        {fetched && <Hourly data={forecastData} units={units} />}
      </div>
    </div>
  );
}

export default App;
