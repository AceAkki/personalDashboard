import RenderAnime from "../hooks/useLottieAnime";

import type { DailyProps } from "../weatherType";
import "./Daily.css";
const Daily = ({ daily, tempUnit }: DailyProps) => {
  console.log(daily);
  let dailyData = daily.time.map((day, index) => {
    return (
      <div className="daily-wrap" key={day}>
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
            {daily.temperature_2m_max[index]}
            {tempUnit}
          </p>
        </div>
        <div className="daily-anime">
          <RenderAnime code={daily.weather_code[index]} />
        </div>
      </div>
    );
  });
  return <div className="weather-daily-wrap">{dailyData}</div>;
};
export default Daily;
