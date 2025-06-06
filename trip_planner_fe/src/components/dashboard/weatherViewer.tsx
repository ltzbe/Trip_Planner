import { useEffect, useState } from "react";
import { getWeatherByCity } from "../../api/openweather/weather.ts";

type Props = {
  cityName: string;
  stateCode: string;
  countryCode: string;
};

export function WeatherViewer({ cityName, stateCode, countryCode }: Props) {
  const [weather, setWeather] = useState<any | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeatherByCity(cityName, stateCode, countryCode);
      setWeather(data);
    }

    fetchWeather();
  }, [cityName, countryCode, stateCode]);

  // const firstEntry = weather.list[0]
  // const description = firstEntry.weather[0].description
  // const iconCode = firstEntry.weather[0].icon
  // const temperature = firstEntry.main.temp
  //
  // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  //

  return (
    <>
      {weather && (
        <div className="weather-wrapper">
          <img
            src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
            alt={weather.list[0].weather[0].description}
          />

          <p>{weather.list[0].weather[0].description}</p>
          <p>{weather.list[0].main.temp}°C</p>
        </div>
      )}
    </>
  );
}
