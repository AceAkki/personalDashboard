import type { WeatherData, AQIData } from "../weatherType";

export const getWeather = async (): Promise<WeatherData> => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=19.1299584&longitude=72.8793088&daily=temperature_2m_max,sunrise,sunset,daylight_duration,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation,surface_pressure,pressure_msl,weather_code,rain,snowfall&timezone=Asia%2FBangkok",
  );
  const data = await res.json();
  return data;
};

export const getAQI = async (): Promise<AQIData> => {
  const res = await fetch(
    "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=pm10,pm2_5",
  );
  const data = await res.json();
  return data;
};
