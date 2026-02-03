import { Suspense, useEffect } from "react";
import {
  useLoaderData,
  Await,
  useRouteLoaderData,
  useOutletContext,
} from "react-router-dom";

import WeatherCard from "./components/WeatherCard";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";

import "./weather.css";

const Weather = () => {
  const weatherData = useRouteLoaderData("root");
  return (
    <section>
      {/* <RenderAnime isDay={parseInt(weatherData.current.is_day)} /> */}
      <Suspense fallback={<h1>Loading </h1>}>
        <Await resolve={weatherData}>
          {(weatherData) => (
            <div className="weather-main-wrap">
              <WeatherCard
                current={weatherData.current}
                current_units={weatherData.current_units}
              />
              <Daily
                daily={weatherData.daily}
                tempUnit={weatherData.daily_units.temperature_2m_max}
              />
              <Hourly
                hourly={weatherData.hourly}
                tempUnit={weatherData.hourly_units.temperature_2m}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
};

export default Weather;
