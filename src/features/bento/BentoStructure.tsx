import { Link, useOutletContext, useLoaderData } from "react-router-dom";

// components imports
import TasksMain from "../task-manager/components/TasksMain";
// import Weather from "../weather/Weather";
import Pomodoro from "../pomodoro/Pomodoro";
import Inspire from "../inspire/Inspire";
import NewsFeed from "../news-feed/NewsFeed";
import Notes from "../Notes/Notes";

// type imports
// import type { OutletContextType } from "../task-manager/types";
import type { DashboardContext } from "../mainTypes";

// css imports
import "./BentoStructure.css";
import WeatherCard from "../weather/components/WeatherCard";

const BentoStructure = () => {
  // const [tasks, setTasks] = useOutletContext<OutletContextType>();
  const { tasks, setTasks, weatherData } = useOutletContext<DashboardContext>();
  return (
    <>
      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>
      <div className="bento-grid-layout">
        <div className="grid-item span-row">
          <TasksMain taskData={tasks} taskSet={setTasks} Type="Priority" />
          <Link to="../taskmanager">Go</Link>
        </div>

        <div className="grid-item">
          <WeatherCard
            current={weatherData.current}
            current_units={weatherData.current_units}
          />
        </div>
        <div className="grid-item">
          <Inspire />
        </div>
        <div className="grid-item">
          <Notes />
        </div>
        <div className="grid-item">
          <Pomodoro />
        </div>
        <div className="grid-item span-column">
          <NewsFeed />
        </div>
        <div className="grid-item">
          <Pomodoro />
        </div>
      </div>
    </>
  );
};

export default BentoStructure;
