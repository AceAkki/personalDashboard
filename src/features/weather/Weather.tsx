import { Suspense } from "react";
import { Await } from "react-router-dom";

import WeatherCard from "./components/WeatherCard";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import WeatherTile from "./components/WeatherTile";
import FallBackLoader from "../../components/ui/FallBackLoader";
import useFetchWeatherData from "./hooks/useFetchWeatherData";

import type { WeatherData } from "./weatherType";

import "./weather.css";
let arr = ["time", "interval", "temperature_2m", "weather_code"];
const Weather = () => {
  let {
    weatherData,
    aqiData,
    weatherQueryLoading,
    apiQueryLoading,
    storageTime,
  } = useFetchWeatherData();
  // let { weatherData, aqiData } = useAPIStore(
  //   useShallow((state) => ({
  //     weatherData: state.weatherStoreData,
  //     aqiData: state.aqiStoreData,
  //   })),
  // );
  // const { weatherData, aqiData } = useRouteLoaderData("root");

  if (weatherQueryLoading || apiQueryLoading || !weatherData || !aqiData)
    return (
      <section className="loader-section">
        <FallBackLoader />
      </section>
    );
  return (
    <section className="overflow-auto inner-route-section">
      {/* <RenderAnime isDay={parseInt(weatherData.current.is_day)} /> */}
      <Suspense fallback={<h1>Loading </h1>}>
        <Await resolve={{ weatherData, aqiData }}>
          {({ weatherData, aqiData }) => (
            <div className="weather-main-wrap">
              <div>
                <h2 className="section-title">Weather</h2>
                <p>
                  Check out the current weather and forecast for your location
                </p>
              </div>
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
                          current={
                            weatherData.current[
                              key as keyof WeatherData["current"]
                            ] as number
                          }
                          current_units={
                            weatherData.current_units[
                              key as keyof WeatherData["current_units"]
                            ]
                          }
                        />
                      );
                    })}
                </div>
                <div className="weather-grid-item">
                  <h2 className="section-sub-title">Hourly Updates</h2>
                  <Hourly
                    hourly={weatherData.hourly}
                    tempUnit={weatherData.hourly_units.temperature_2m}
                  />
                </div>
              </div>
              <div className="weather-grid-item">
                <h2 className="section-sub-title">Daily Updates</h2>
                <Daily
                  daily={weatherData.daily}
                  tempUnit={weatherData.daily_units.temperature_2m_max}
                />
              </div>{" "}
              <div className="expiry-time">
                Expiry Time : &nbsp;
                {storageTime
                  ? new Date(storageTime).toLocaleDateString("default", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : null}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
};

export default Weather;
