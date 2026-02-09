import RenderAnime from "../hooks/useLottieAnime";
import type { WeatherCardProps } from "../weatherType";

import "./WeatherCard.css";

const WeatherCard = ({ current, current_units }: WeatherCardProps) => {
  console.log(current, current_units);
  return (
    <div className="weather-card">
      <div>
        <h2 className="weather-date">
          {new Date(current.time).toLocaleDateString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
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
    </div>
  );
};

export default WeatherCard;
