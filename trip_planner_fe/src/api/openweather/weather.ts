const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast"

export const getWeatherByCity = async (city: string, state?: string,country?: string) => {
    let location = city
    if (state) location += `,${state}`
    if (country) location += `,${country}`

    const url = `${WEATHER_URL}?q=${location}&appid=${WEATHER_API_KEY}&units=metric&lang=de`

    const response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        console.error("Fehler beim Abrufen der Wetterdaten: ", response.statusText)
        return null
    }
}   