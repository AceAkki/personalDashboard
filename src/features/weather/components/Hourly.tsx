import RenderAnime from "../hooks/useLottieAnime";
import useDateFormatter from "../utils/dateFormatter";

import type { HourlyProps } from "../weatherType";

import "./Hourly.css";

const Hourly = ({ hourly, tempUnit }: HourlyProps) => {
  const { hourArray, startIndex } = useDateFormatter(hourly.time);
  let hourlyData = hourArray.map((hour, index) => {
    let newIndex = startIndex + index;
    return (
      <div className="hour-wrap" key={hour}>
        <div className="hourly-content">
          <div className="hour-det">
            <p>
              {new Date(hour)
                .toLocaleDateString(undefined, { hour: "2-digit" })
                .split(",")[1]
                .replace(/(\s)+/gm, "")}
            </p>
          </div>
          <div className="hour-temp">
            <p>
              {hourly.temperature_2m[newIndex]}
              {tempUnit}
            </p>
          </div>
        </div>
        <div className="hour-anime">
          <RenderAnime code={hourly.weather_code[newIndex]} />
        </div>
      </div>
    );
  });
  return <div className="weather-hourly-wrap scroll">{hourlyData}</div>;
};
export default Hourly;
