import RenderAnime from "../hooks/useLottieAnime";
import type { WeatherCardProps } from "../weatherType";

import "./WeatherCard.css";

const WeatherCard = ({
  current,
  current_units,
  aqiCurrent,
  aqiCurrent_units,
}: WeatherCardProps) => {
  console.log(current, current_units, aqiCurrent, aqiCurrent_units);
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
      <div className="weather-aqui">
        <p className="aqi-txt">
          <strong>PM 10 : </strong>
          {aqiCurrent.pm10}
          {aqiCurrent_units.pm10}
        </p>
        <p className="aqi-txt">
          <strong>PM 2.5 : </strong>
          {aqiCurrent.pm2_5}
          {aqiCurrent_units.pm2_5}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
