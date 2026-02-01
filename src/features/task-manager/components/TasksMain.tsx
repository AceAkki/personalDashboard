import { useState } from "react";
import Task from "./Task";

import type { TasksMainProps } from "../types";
import "./TasksMain.css";

const TasksMain = ({ taskData, taskSet, Type }: TasksMainProps) => {
  let [activeTaskID, setActiveTaskID] = useState<string | null>(null);
  let filterTasks = taskData.filter(
    (task) => task.type[Type as keyof typeof task.type],
  );
  return (
    <div className="tasks-main-wrap">
      <h3 className="tasks-main-title">{Type} Tasks</h3>
      <div className="tasks-wrap">
        {filterTasks.map((task) => (
          <Task
            key={`${task.id}`}
            taskTxt={task}
            taskSet={taskSet}
            taskIDMain={[activeTaskID, setActiveTaskID]}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksMain;
