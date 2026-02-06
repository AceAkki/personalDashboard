import RenderAnime from "../hooks/useLottieAnime";
import { DropSimple, Wind, Gauge } from "@phosphor-icons/react";

import type { WeatherCardProps } from "../weatherType";

import "./WeatherCard.css";

const WeatherCard = ({ current, current_units }: WeatherCardProps) => {
  console.log(current);
  return (
    <div className="weather-card">
      <div>
        <h2>
          {new Date(current.time).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
      </div>
      <div className="weather-temp">
        <h2 className="temp">
          {current.temperature_2m}
          {current_units.temperature_2m}
        </h2>
        <RenderAnime code={current.weather_code} />
      </div>
      <div className="weather-info-wrap">
        <div className="weather-info">
          <DropSimple size={32} />
          <p>
            {current.relative_humidity_2m}
            {current_units.relative_humidity_2m}
          </p>
        </div>
        <div className="weather-info">
          <Wind size={32} />
          <p>
            {current.wind_speed_10m}
            {current_units.wind_speed_10m}
          </p>
        </div>
        <div className="weather-info">
          <Gauge size={32} />
          <p>
            {current.surface_pressure}
            {current_units.surface_pressure}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
