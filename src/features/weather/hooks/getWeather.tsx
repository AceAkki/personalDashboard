export const getWeather = async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=19.1299584&longitude=72.8793088&daily=temperature_2m_max,sunrise,sunset,daylight_duration,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,is_day,apparent_temperature,weather_code,rain,snowfall&timezone=Asia%2FBangkok"
  );
  const data = await res.json();
  return data;
};
