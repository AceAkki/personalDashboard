import Task from "./Task";

import { TasksProps } from "../types";

const CurrentTasks = ({ taskData, taskSet }: TasksProps) => {
  let filterTasks = taskData.filter((task) => task.type.Current);
  console.log(filterTasks);
  return (
    <>
      <h3>Current Tasks</h3>
      <div className="tasks-wrap">
        {filterTasks.map((task, index) => (
          <Task key={`${task}-${index}`} taskTxt={task} taskSet={taskSet} />
        ))}
      </div>
    </>
  );
};

export default CurrentTasks;
