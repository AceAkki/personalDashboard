// react based import statements
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  type ActionFunctionArgs,
  useOutletContext,
} from "react-router-dom";
import { nanoid } from "nanoid";

// component imports
import TasksMain from "./components/TasksMain";
// type imports
import type {
  TaskActionData,
  TasksProps,
  OutletContextType,
} from "./taskTypes";
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
  const [tasks, setTasks] = useOutletContext<OutletContextType>();
  const actionData = useActionData() as TaskActionData | null;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (actionData?.taskName) {
      setTasks((prev) => [...prev, actionData]);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [actionData]);

  return (
    <section>
      <h2 className="task-manager-title">Task Manager</h2>
      <p>Track your tasks here and keep your brain free for another things.</p>

      <Form method="post">
        <input
          type="text"
          name="task"
          placeholder="Add a New Task"
          required
          ref={inputRef}
        />
        <button type="submit">Add Task</button>
      </Form>

      <div className="tasks-grid-wrap">
        <TasksMainWrapper taskData={tasks} taskSet={setTasks} />
      </div>
    </section>
  );
};

export default TaskManager;
