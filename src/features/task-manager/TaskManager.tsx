import {
  useActionData,
  type ActionFunctionArgs,
  useOutletContext,
} from "react-router-dom";
import { nanoid } from "nanoid";

// component imports
import TasksMain from "./components/TasksMain";
import TaskForm from "./components/TaskForm";

import useTaskMain from "./hooks/useTaskMain";

// type imports
import type { TaskActionData, TasksProps } from "./taskTypes";
import type { DashboardContext } from "../mainTypes";

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

const TasksMainWrapper = ({ taskData, taskSet }: TasksProps) => {
  return ["Current", "Priority", "Completed"].map((Type) => (
    <TasksMain key={Type} taskData={taskData} taskSet={taskSet} Type={Type} />
  ));
};

const TaskManager = () => {
  const { tasks, setTasks } = useOutletContext<DashboardContext>();
  const inputRef = useTaskMain(setTasks);

  return (
    <section className="overflow-unset">
      <h2 className="task-manager-title">Task Manager</h2>
      <p>Track your tasks here and keep your brain free for another things.</p>

      <TaskForm inputRef={inputRef} />

      <div className="tasks-grid-wrap">
        <TasksMainWrapper taskData={tasks} taskSet={setTasks} />
      </div>
    </section>
  );
};

export default TaskManager;
