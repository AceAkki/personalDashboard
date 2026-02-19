import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import WeatherCard from "./components/WeatherCard";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import WeatherTile from "./components/WeatherTile";

import "./weather.css";
let arr = ["time", "interval", "temperature_2m", "weather_code"];
const Weather = () => {
  const { weatherData, aqiData } = useRouteLoaderData("root");
  return (
    <section className="overflow-auto inner-route-section">
      {/* <RenderAnime isDay={parseInt(weatherData.current.is_day)} /> */}
      <Suspense fallback={<h1>Loading </h1>}>
        <Await resolve={{ weatherData, aqiData }}>
          {({ weatherData, aqiData }) => (
            <div className="weather-main-wrap">
              <div className="top-row weather-grid-item">
                <div className="weather-left-wrap weather-grid-item">
                  <WeatherCard
                    current={weatherData.current}
                    current_units={weatherData.current_units}
                    aqiCurrent={aqiData.current}
                    aqiCurrent_units={aqiData.current_units}
                  />
                </div>
                <div className="weather-tile-wrap weather-grid-item">
                  {Object.keys(weatherData.current)
                    .filter((key) => !arr.includes(key))
                    .map((key) => {
                      return (
                        <WeatherTile
                          key={key}
                          icon={key}
                          current={weatherData.current[key]}
                          current_units={weatherData.current_units[key]}
                        />
                      );
                    })}
                </div>
              </div>

              <div className="weather-grid-item">
                <Daily
                  daily={weatherData.daily}
                  tempUnit={weatherData.daily_units.temperature_2m_max}
                />
              </div>
              <div className="weather-grid-item span-column">
                <Hourly
                  hourly={weatherData.hourly}
                  tempUnit={weatherData.hourly_units.temperature_2m}
                />
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
};

export default Weather;
