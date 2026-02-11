import RenderAnime from "../hooks/useLottieAnime";
import { getAQILevel, USAQI } from "../hooks/useAQI";
import type { WeatherCardProps } from "../weatherType";
import "./WeatherCard.css";

const WeatherCard = ({
  current,
  current_units,
  aqiCurrent,
  aqiCurrent_units,
}: WeatherCardProps) => {
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
          <strong>AQI : </strong>
          {aqiCurrent.us_aqi}
          <span> {aqiCurrent_units.us_aqi}</span> |
          <strong>
            &nbsp;
            {getAQILevel(aqiCurrent.us_aqi, USAQI).toSentenceCase() as string}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
