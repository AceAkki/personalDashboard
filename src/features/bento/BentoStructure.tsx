import { useOutletContext } from "react-router-dom";

// components imports
import TasksMain from "../task-manager/components/TasksMain";
import TaskForm from "../task-manager/components/TaskForm";

// import Weather from "../weather/Weather";
// import Pomodoro from "../pomodoro/Pomodoro";
import Pomo from "../pomodoro/Pomo";
import Inspire from "../inspire/Inspire";
import NotesForm from "../quicknotes/components/NotesForm";
import WeatherCard from "../weather/components/WeatherCard";
import LinkStorage from "../linkStorage/LinkStorage";

import useTaskMain from "../task-manager/hooks/useTaskMain";
import useRouteNewsData from "../news-feed/hooks/useRouteNewsData";
import RenderNews from "../news-feed/components/RenderNews";
import FavLinks from "../favLinks/FavLinks";

// type imports
// import type { OutletContextType } from "../task-manager/types";
import type { DashboardContext } from "../mainTypes";

// css imports
import "./BentoStructure.css";

const BentoStructure = () => {
  // const [tasks, setTasks] = useOutletContext<OutletContextType>();
  const { tasks, setTasks, setNotes, weatherData, aqiData } =
    useOutletContext<DashboardContext>();
  const inputRef = useTaskMain(setTasks);
  const newsArr = useRouteNewsData();
  return (
    <>
      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>
      <div className="bento-grid-layout">
        <div className="grid-item span-row">
          <TaskForm inputRef={inputRef} />
          <TasksMain taskData={tasks} taskSet={setTasks} Type="Priority" />
        </div>

        <div className="grid-item">
          <WeatherCard
            current={weatherData.current}
            current_units={weatherData.current_units}
            aqiCurrent={aqiData.current}
            aqiCurrent_units={aqiData.current_units}
          />
        </div>
        <div className="grid-item span-column">
          <FavLinks />
        </div>

        <div className="grid-item">
          <TasksMain taskData={tasks} taskSet={setTasks} Type="Current" />
        </div>

        <div className="grid-item">
          <LinkStorage />
        </div>
        <div className="grid-item">
          <NotesForm setNotes={setNotes} />
        </div>

        {/* <div className="grid-item">
          <Pomodoro />
        </div> */}
        <div className="grid-item">
          <Pomo />
        </div>
        <div className="grid-item">
          <Inspire />
        </div>

        <div className="grid-item span-column">
          <RenderNews newsArr={newsArr} />
        </div>
      </div>
    </>
  );
};

export default BentoStructure;
