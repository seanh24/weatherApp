
const Current = (props) => {

    let units = props.units === 'F' ? 'f' : 'c'
    let location = props.location.name + ', ' + props.location.region
    let temp = Math.floor(props.data[`temp_${units}`])
    let feel = props.data[`feelslike_${units}`]
    let windSpeed = props.data['wind_mph']
    let windDir = props.data['wind_dir']
    let humidity = props.data.humidity
    let uv = props.data.uv
    let weather = props.data.condition.text
    let weatherIcon = props.data.condition.icon


    
    return (
        <div className='current'>

            <div className="current-text">
                <h2>{location}</h2>
            </div>
            
            <div className="currentBox">

                <div className='currentBox1'>
                    <img src={weatherIcon} alt='weather condition'/>
                    <h3>{temp}<span>&#176;</span>{units.toUpperCase()}</h3>
                </div>

                <div className='currentBox2'>
                    <p>Condition: {weather}</p>
                    <p>Feels like: {feel}{units.toUpperCase()} </p>
                    <p>Humidity: {humidity}%</p>
                    <p>UV Index: {uv}</p>
                    <p>Wind: {windDir} {windSpeed} mph</p>
                </div>

            </div>

        </div>
    )
}



export default Current