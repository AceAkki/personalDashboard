import RenderAnime from "../hooks/useLottieAnime";

import type { HourlyProps } from "../weatherType";

import "./Hourly.css";

const Hourly = ({ hourly, tempUnit }: HourlyProps) => {
  let hourlyData = hourly.time.map((hour, index) => {
    return (
      <div className="hour-wrap" key={hour}>
        <div className="hour-det">
          <p>
            {
              new Date(hour)
                .toLocaleDateString(undefined, { hour: "2-digit" })
                .split(",")[1]
            }
          </p>
        </div>
        <div className="hour-temp">
          <p>
            {hourly.temperature_2m[index]}
            {tempUnit}
          </p>
        </div>
        <div className="hour-anime">
          <RenderAnime code={hourly.weather_code[index]} />
        </div>
      </div>
    );
  });
  return <div className="weather-hourly-wrap span-column">{hourlyData}</div>;
};
export default Hourly;
