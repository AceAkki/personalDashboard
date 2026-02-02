import { Suspense, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";

import RenderAnime from "./useLottieAnime";
import { DropSimple, Wind, Gauge } from "@phosphor-icons/react";
import "./weather.css";

const Weather = ({ data }: any) => {
  const weatherData = useLoaderData() || data;
  console.log(weatherData);

  return (
    <section>
      <h1>Weather</h1>
      {/* <RenderAnime isDay={parseInt(weatherData.current.is_day)} /> */}
      <div className="weather-card">
        <div>
          <h2>
            {new Date(weatherData.current.time).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </div>
      </div>

      <div className="weather-temp">
        <h2 className="temp">
          {weatherData.current.temperature_2m}
          {weatherData.current_units.temperature_2m}
        </h2>
        <RenderAnime code={parseInt(weatherData.current.weather_code)} />
      </div>

      <div className="weather-info-wrap">
        <div className="weather-info">
          <DropSimple size={32} />
          <h2>
            {weatherData.current.relative_humidity_2m}
            {weatherData.current_units.relative_humidity_2m}
          </h2>
        </div>
        <div className="weather-info">
          <Wind size={32} />
          <h2>
            {weatherData.current.wind_speed_10m}
            {weatherData.current_units.wind_speed_10m}
          </h2>
        </div>
        <div className="weather-info">
          <Gauge size={32} />
          <h2>
            {weatherData.current.surface_pressure}
            {weatherData.current_units.surface_pressure}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Weather;
