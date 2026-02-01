// react based import statements
import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  type ActionFunctionArgs,
  useOutletContext,
} from "react-router-dom";

// css import statements
import "./TaskManager.css";

// component imports
import TasksMain from "./components/TasksMain";

// all type definitions
import type { TaskActionData, TasksProps, OutletContextType } from "./types";
import { nanoid } from "nanoid";

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
  const [tasks, setTasks] = useOutletContext<OutletContextType>();
  const actionData = useActionData() as TaskActionData | null;

  useEffect(() => {
    if (actionData?.taskName) {
      setTasks((prev) => [...prev, actionData]);
    }
  }, [actionData]);

  return (
    <div>
      <h2>Task Manager</h2>
      <p>This is the Task Manager component.</p>

      <Form method="post">
        <input type="text" name="task" placeholder="New Task" required />
        <button type="submit">Add Task</button>
      </Form>

      <div className="tasks-grid-wrap">
        <TasksMainWrapper taskData={tasks} taskSet={setTasks} />
      </div>
    </div>
  );
};

export default TaskManager;
