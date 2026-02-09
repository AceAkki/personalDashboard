import {
  DropSimple,
  Wind,
  Gauge,
  CloudRain,
  CloudSnow,
  CloudFog,
  Thermometer,
  CloudMoon,
  CloudSun,
} from "@phosphor-icons/react";

import type { WeatherCardProps } from "../weatherType";

import "./weatherTile.css";

const weatherIcon = {
  humidity: <DropSimple size={32} />,
  wind: <Wind size={32} />,
  pressure: <Gauge size={32} />,
  rain: <CloudRain size={32} />,
  snowfall: <CloudSnow size={32} />,
  precipitation: <CloudFog size={32} />,
  temperature: <Thermometer size={32} />,
};

const dayType = {
  0: <CloudMoon size={32} />,
  1: <CloudSun size={32} />,
};

type WeatherTileProps = {
  current: number;
  current_units: string;
  icon: string;
};
const WeatherTile = ({ current, current_units, icon }: WeatherTileProps) => {
  let weatherIconKey = Object.keys(weatherIcon).filter((key) =>
    icon.includes(key),
  );
  console.log(icon, weatherIconKey);
  return (
    <div className="weather-tile">
      {icon !== "is_day" ? weatherIcon[weatherIconKey] : dayType[1]}
      {icon !== "is_day" ? (
        <p>
          {current}
          {current_units}
        </p>
      ) : null}
    </div>
  );
};

export default WeatherTile;
