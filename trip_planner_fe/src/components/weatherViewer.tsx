import { useEffect, useState } from "react"
import { getWeatherByCity } from "../api/openweather/weather"
import "../css/about.css";

export function WeatherViewer() {
    const [weather, setWeather] = useState<any>(null)

    useEffect(() => {
        async function fetchWeather() {
            const data = await getWeatherByCity("Friedrichshafen", "BW", "DE")
            setWeather(data)
        }

        fetchWeather()
    }, [])

    if (!weather) return <p>Lade Wetterdaten...</p>

    const firstEntry = weather.list[0]
    const description = firstEntry.weather[0].description
    const iconCode = firstEntry.weather[0].icon
    const temperature = firstEntry.main.temp

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    

    return (
        <div>
            <h2>Wettervorhersage für {weather.city.name}</h2>

            <img src={iconUrl} alt={description} />

            <p>{description}</p>
            <p>{temperature}°C</p>
        </div>
    )
}