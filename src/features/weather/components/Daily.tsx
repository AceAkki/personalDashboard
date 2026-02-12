import RenderAnime from "../hooks/useLottieAnime";

import type { DailyProps } from "../weatherType";
import "./Daily.css";
const Daily = ({ daily, tempUnit }: DailyProps) => {
  const filteredArr = daily.time.filter((__, index) => index > 0);
  let dailyData = filteredArr.map((day, index) => {
    let newIndex = index + 1;
    return (
      <div className="daily-main-wrap" key={day}>
        <div className="daily-weather-wrap">
          <div className="daily-content-wrap">
            <div className="daily-date">
              <p>
                {new Date(day).toLocaleDateString(undefined, {
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
            <div className="daily-temp">
              <p>
                {daily.temperature_2m_max[newIndex]}
                {tempUnit}
              </p>
            </div>
          </div>
          <div className="daily-anime">
            <RenderAnime code={daily.weather_code[newIndex]} />
          </div>
        </div>
        <div className="daily-sun-wrap">
          <div className="daily-sun">
            <p>
              <strong>Sunrise: </strong>
              {
                new Date(daily.sunrise[newIndex])
                  .toLocaleDateString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .split(", ")[1]
              }
            </p>
          </div>
          <div className="daily-sun">
            <p>
              <strong>Sunset: </strong>
              {
                new Date(daily.sunset[newIndex])
                  .toLocaleDateString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .split(", ")[1]
              }
            </p>
          </div>
        </div>
      </div>
    );
  });
  return <div className="weather-daily-wrap scroll">{dailyData}</div>;
};
export default Daily;
