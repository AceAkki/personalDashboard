import type { WeatherData, AQIData } from "../weatherType";
import type { location } from "../../mainTypes";

export const getWeather = async ({
  latitude,
  longitude,
}: location): Promise<WeatherData | null> => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,sunrise,sunset,daylight_duration,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation,surface_pressure,pressure_msl,weather_code,rain,snowfall&timezone=Asia%2FBangkok`,
    );
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAQI = async ({
  latitude,
  longitude,
}: location): Promise<AQIData | null> => {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,us_aqi`,
    );
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
