export const getWeather = async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset,uv_index_max,daylight_duration&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,is_day,apparent_temperature,weather_code,rain,snowfall&forecast_days=1",
  );
  const data = await res.json();
  return data;
};
