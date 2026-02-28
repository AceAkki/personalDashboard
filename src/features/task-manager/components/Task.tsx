import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import TuneIcon from "@mui/icons-material/Tune";

// components imports
import { useTaskStore } from "../hooks/useTasksStore";
import OptionsPopup from "./OptionsPopup";
// type imports
import type { TaskType, TaskIDMainType } from "../taskTypes";

// css imports
import "./Task.css";

const Task = ({ taskTxt, taskSet }: TaskType) => {
  const optionRef = useRef<HTMLDivElement>(null);
  //const [activeTaskID, setActiveTaskID] = taskIDMain;
  const { tasks, updateTasks, taskID, setTaskID } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      updateTasks: state.updateTasks,
      taskID: state.taskID,
      setTaskID: state.setTaskID,
    })),
  );

  return (
    <div className="task-wrap">
      <p>{taskTxt.taskName}</p>
      <div
        className="task-btn"
        onClick={() => {
          taskID === taskTxt.id ? setTaskID(null) : setTaskID(taskTxt.id);
        }}
      >
        <TuneIcon />
        {taskID === taskTxt.id && (
          <OptionsPopup
            refer={optionRef}
            taskSet={updateTasks}
            taskTxt={taskTxt}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
