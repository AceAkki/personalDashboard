export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: Weather_current_units;

  current: Weather_current;

  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };

  daily_units: {
    time: string;
    temperature_2m_max: string;
    sunrise: string;
    sunset: string;
    daylight_duration: string;
    weather_code: string;
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
    weather_code: number[];
  };
};

type Weather_current_units = {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  surface_pressure: string;
  is_day: string;
  apparent_temperature: string;
  weather_code: string;
  rain: string;
  snowfall: string;
};

type Weather_current = {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  surface_pressure: number;
  is_day: number;
  apparent_temperature: number;
  weather_code: number;
  rain: number;
  snowfall: number;
};

export type AQIData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: AQI_current_units;
  current: AQI_current;
};

type AQI_current = {
  time: string;
  interval: number;
  pm10: number;
  pm2_5: number;
  us_aqi: number;
};

type AQI_current_units = {
  time: string;
  interval: string;
  pm10: string;
  pm2_5: string;
  us_aqi: string;
};

export interface WeatherCardProps {
  current_units: Weather_current_units;
  current: Weather_current;
  aqiCurrent_units: AQI_current_units;
  aqiCurrent: AQI_current;
}

export interface HourlyProps {
  tempUnit: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export interface DailyProps {
  tempUnit: string;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    daylight_duration: number[];
    weather_code: number[];
  };
}

export type objUSAQI = {
  good: number[];
  moderate: number[];
  sensitive: number[];
  unhealthy: number[];
  severe: number[];
  hazardous: number[];
};

export type AQILevel = keyof objUSAQI;
