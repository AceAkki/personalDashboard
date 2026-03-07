import { useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
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
import { useTaskStore } from "../task-manager/hooks/useTasksStore";
import useRouteNewsData from "../news-feed/hooks/useRouteNewsData";
import RenderNews from "../news-feed/components/RenderNews";
import FavLinks from "../favLinks/FavLinks";

import { useNoteStore } from "../quicknotes/hooks/useNoteStore";

// State
import { useUserStore } from "../auth/useAuthStore";

// type imports
import type { DashboardContext } from "../mainTypes";
import OptionsPopup from "../task-manager/components/OptionsPopup";
// css imports
import "./BentoStructure.css";

const BentoStructure = () => {
  const { weatherData, aqiData } = useOutletContext<DashboardContext>();
  const newsArr = useRouteNewsData();

  const { tasks, updateTasks, taskID } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      updateTasks: state.updateTasks,
      taskID: state.taskID,
    })),
  );
  const inputRef = useTaskMain(updateTasks);
  const optionRef = useRef<HTMLDivElement>(null);

  const taskTxt = tasks.find((task) => task?.id === taskID);

  const username = useUserStore((state) => state.username);

  const updateNotes = useNoteStore((state) => state.updateNotes);

  return (
    <>
      <div className="welcome-greet-wrap">
        <h1>Welcome {username}!</h1>
      </div>
      <div className="bento-grid-layout">
        <div className="grid-item span-row">
          <div>
            <TaskForm inputRef={inputRef} />
          </div>
          <TasksMain taskData={tasks} taskSet={updateTasks} Type="Priority" />
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
          <TasksMain taskData={tasks} taskSet={updateTasks} Type="Current" />
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
      {taskID === taskTxt?.id && (
        <OptionsPopup refer={optionRef} taskObject={taskTxt} />
      )}
    </>
  );
};

export default BentoStructure;
