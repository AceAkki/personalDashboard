import Task from "./Task";

import { TasksProps } from "../types";

const PriorityTasks = ({ taskData, taskSet }: TasksProps) => {
  let filterTasks = taskData.filter((task) => task.type.Priority);
  return (
    <>
      <h3>Priority Tasks</h3>
      <div className="tasks-wrap">
        {filterTasks.map((task, index) => (
          <Task key={`${task}-${index}`} taskTxt={task} taskSet={taskSet} />
        ))}
      </div>
    </>
  );
};

export default PriorityTasks;
