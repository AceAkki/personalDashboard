import { useOutletContext } from "react-router-dom";

// components imports
import TasksMain from "../task-manager/components/TasksMain";
import TaskForm from "../task-manager/components/TaskForm";

// import Weather from "../weather/Weather";
// import Pomodoro from "../pomodoro/Pomodoro";
import Pomodoro from "../pomodoro/Pomodoro";
// import Inspire from "../inspire/Inspire";
import NotesForm from "../quicknotes/components/NotesForm";
import WeatherCard from "../weather/components/WeatherCard";
import LinkStorage from "../linkStorage/LinkStorage";

import useTaskMain from "../task-manager/hooks/useTaskMain";
import useRouteNewsData from "../news-feed/hooks/useRouteNewsData";
import RenderNews from "../news-feed/components/RenderNews";
import FavLinks from "../favLinks/FavLinks";

import { useNoteStore } from "../quicknotes/hooks/useNoteStore";

// State
import { useUserStore } from "../auth/useAuthStore";

// type imports
import type { DashboardContext } from "../mainTypes";

// css imports
import "./BentoStructure.css";

const BentoStructure = () => {
  const { tasks, setTasks, weatherData, aqiData } =
    useOutletContext<DashboardContext>();
  const inputRef = useTaskMain(setTasks);
  const newsArr = useRouteNewsData();

  const username = useUserStore((state) => state.username);
  const updateNotes = useNoteStore((state) => state.updateNotes);

  return (
    <>
      <div className="welcome-greet-wrap">
        <h1>Welcome {username}!</h1>
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
          <NotesForm setNotes={updateNotes} />
        </div>

        <div className="grid-item">
          <Pomodoro />
        </div>

        <div className="grid-item span-column">
          <RenderNews newsArr={newsArr} />
        </div>
        <div className="grid-item">
          <LinkStorage />
        </div>
        {/* <div className="grid-item">
          <Inspire />
        </div> */}
      </div>
    </>
  );
};

export default BentoStructure;
