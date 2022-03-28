import { useState } from "react";

const Hourly = (props) => {
    const [day, setDay] = useState(0)
    const [styleToday, setStyleToday] = useState({fontWeight: 'bolder'})
    const [styleTomorrow, setStyleTomorrow] = useState({fontWeight: 'normal'})
    const [styleNextDay, setStyleNextDay] = useState({fontWeight: 'normal'})


    const setTemp = (time) => props.data.forecastday[day].hour[time][`temp_${props.units.toLowerCase()}`]
    const setIcon = (time) => props.data.forecastday[day].hour[time].condition.icon
    let hourlyForecast = [];

    for (let i = 0; i < 24; i++) {
        hourlyForecast.push([`${i}`,setTemp(i), setIcon(i)])
    }

    hourlyForecast.map(arr => {
        if (arr[0] > 12) {
            arr[0] = arr[0] - 12 + ' pm'
        }
        else if(arr[0] === '12') {
            arr[0] = arr[0] + ' pm'
        } 
        else {
            arr[0] = arr[0] + ' am'
        }
        return arr[0]
    })
    hourlyForecast.map(arr => {
        if (arr[0].length < 5) {
            arr[0] = '0' + arr[0]
        }
        return arr[0]
    })
    

    const handleToday = (e) => {
        setDay(e.target.value)
        setStyleToday({fontWeight: 'bolder'})
        setStyleTomorrow({fontWeight: 'normal'})
        setStyleNextDay({fontWeight: 'normal'})
                
    }
    const handleTomorrow =(e) => {
        setDay(e.target.value)
        setStyleToday({fontWeight: 'normal'})
        setStyleTomorrow({fontWeight: 'bolder'})
        setStyleNextDay({fontWeight: 'normal'})
    }

    const handleNextDay =(e) => {
        setDay(e.target.value)
        setStyleToday({fontWeight: 'normal'})
        setStyleTomorrow({fontWeight: 'normal'})
        setStyleNextDay({fontWeight: 'bolder'})
    }


    return(
        <div>
            <div className="nav-hourly">
                <h3>
                    <button value={0} className='hourly-btn' onClick={handleToday} style={styleToday}>Today</button> |
                    <button value={1} className='hourly-btn' onClick={handleTomorrow} style={styleTomorrow}>Tomorrow</button> |
                    <button value={2} className='hourly-btn' onClick={handleNextDay} style={styleNextDay}>Next Day</button>
                </h3>
                
            </div>
            
            {hourlyForecast.map((hour,index) => {
                return(
                    <div key={index} className='hour-rows'>
                        {hour[0]} 
                        <img src={hour[2]} alt='icon' /> 
                        {hour[1]}{props.units}
                    </div>
                )
            })}
        </div>
    )
}

export default Hourly