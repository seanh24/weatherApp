

const DailyForecast = (props) => {
    let units = props.units
    let tempHigh = props.data.forecastday[props.day]['day'][`maxtemp_${units.toLowerCase()}`]
    let tempLow = props.data.forecastday[props.day]['day'][`mintemp_${units.toLowerCase()}`]
    let img = props.data.forecastday[props.day].day.condition.icon
    let rainChance = props.data.forecastday[props.day].day['daily_chance_of_rain']
    
    
    return (
        <div className='day-tile'>
            <img src={img} alt="icon" />
            <h4>H: {tempHigh} L: {tempLow}</h4>
            <h5>Rain Chance: {rainChance}%</h5>
        </div>
    )
}

export default DailyForecast