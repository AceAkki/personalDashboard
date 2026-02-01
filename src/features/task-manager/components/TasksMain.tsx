import Task from "./Task";

import type { TasksMainProps } from "../types";
import "./TasksMain.css";

const TasksMain = ({ taskData, taskSet, Type }: TasksMainProps) => {
  let filterTasks = taskData.filter(
    (task) => task.type[Type as keyof typeof task.type],
  );
  return (
    <div className="tasks-main-wrap">
      <h3 className="tasks-main-title">{Type} Tasks</h3>
      <div className="tasks-wrap">
        {filterTasks.map((task, index) => (
          <Task key={`${task}-${index}`} taskTxt={task} taskSet={taskSet} />
        ))}
      </div>
    </div>
  );
};

export default TasksMain;
