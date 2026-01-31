import { useRef } from "react";

import TuneIcon from "@mui/icons-material/Tune";
import "./Task.css";

import { TaskType, TasksProps } from "../types";

import OptionsPopup from "./OptionsPopup";

const Task = ({ taskTxt, taskSet }: TaskType) => {
  const optionRef = useRef<HTMLDivElement>(null);
  return (
    <div className="task-wrap">
      <p>{taskTxt.taskName}</p>
      <div
        className="task-btn"
        onClick={() => optionRef.current?.classList.toggle("hide")}
      >
        <TuneIcon />
        <OptionsPopup refer={optionRef} taskSet={taskSet} taskTxt={taskTxt} />
      </div>
    </div>
  );
};

export default Task;
