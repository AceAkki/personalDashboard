import { useRef, useState } from "react";

import TuneIcon from "@mui/icons-material/Tune";
import "./Task.css";

import type { TaskType, TaskIDMainType } from "../types";

import OptionsPopup from "./OptionsPopup";

const Task = ({
  taskTxt,
  taskSet,
  taskIDMain,
}: TaskType & { taskIDMain: TaskIDMainType }) => {
  const optionRef = useRef<HTMLDivElement>(null);
  const [activeTaskID, setActiveTaskID] = taskIDMain;
  return (
    <div className="task-wrap">
      <p>{taskTxt.taskName}</p>
      <div
        className="task-btn"
        onClick={() => {
          setActiveTaskID((prev) => (prev === taskTxt.id ? null : taskTxt.id));
        }}
      >
        <TuneIcon />

        {activeTaskID === taskTxt.id && (
          <OptionsPopup refer={optionRef} taskSet={taskSet} taskTxt={taskTxt} />
        )}
      </div>
    </div>
  );
};

export default Task;
