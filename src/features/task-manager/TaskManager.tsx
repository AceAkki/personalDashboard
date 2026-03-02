import { type ActionFunctionArgs } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import { useRef } from "react";
// component imports
import TasksMain from "./components/TasksMain";
import TaskForm from "./components/TaskForm";

import useTaskMain from "./hooks/useTaskMain";
import { useTaskStore } from "./hooks/useTasksStore";
import OptionsPopup from "../task-manager/components/OptionsPopup";
// type imports
import type { TaskActionData, TasksProps } from "./taskTypes";

// css imports
import "./TaskManager.css";

// action function to handle form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const task = formData.get("task") as string;
  if (!task) return null;
  let newTask = {
    taskName: task,
    id: nanoid(),
    type: { Current: true, Priority: false, Completed: false },
  } as TaskActionData;
  return newTask;
}

// maun wrapper
const TasksMainWrapper = ({ taskData, taskSet }: TasksProps) => {
  return ["Current", "Priority", "Completed"].map((Type) => (
    <TasksMain key={Type} taskData={taskData} taskSet={taskSet} Type={Type} />
  ));
};

const TaskManager = () => {
  const { tasks, updateTasks, taskID } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      updateTasks: state.updateTasks,
      taskID: state.taskID,
      setTaskID: state.setTaskID,
    })),
  );
  const inputRef = useTaskMain(updateTasks);
  const optionRef = useRef<HTMLDivElement>(null);
  const taskTxt = tasks.find((task) => task?.id === taskID);
  return (
    <>
      <section className="overflow-unset inner-route-section">
        <h2 className="task-manager-title">Task Manager</h2>
        <p>
          Track your tasks here and keep your brain free for another things.
        </p>
        <div className="tasks-grid-wrap">
          <TaskForm inputRef={inputRef} />
        </div>

        <div className="tasks-grid-wrap">
          <TasksMainWrapper taskData={tasks} taskSet={updateTasks} />
        </div>
      </section>
      {taskID === taskTxt?.id && (
        <OptionsPopup refer={optionRef} taskObject={taskTxt} />
      )}
    </>
  );
};

export default TaskManager;
