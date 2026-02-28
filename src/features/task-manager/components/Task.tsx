import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import TuneIcon from "@mui/icons-material/Tune";

// components imports
import { useTaskStore } from "../hooks/useTasksStore";
import OptionsPopup from "./OptionsPopup";
// type imports
import type { TaskType } from "../taskTypes";

// css imports
import "./Task.css";

const Task = ({ taskTxt }: TaskType) => {
  const optionRef = useRef<HTMLDivElement>(null);
  //const [activeTaskID, setActiveTaskID] = taskIDMain;
  const { moveTask, deleteTask, taskID, setTaskID } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      moveTask: state.moveTask,
      deleteTask: state.deleteTask,
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
            taskObject={taskTxt}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Task;
